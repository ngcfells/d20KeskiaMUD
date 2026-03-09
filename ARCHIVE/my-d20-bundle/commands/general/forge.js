/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/forge.js
 * PURPOSE: Dual-purpose command for Smithing and Document Forgery.
 */

'use strict';

const { Broadcast: B } = require('ranvier');
const ItemUtil = require('../../lib/ItemUtil');

module.exports = {
  usage: 'forge <item/document> [materials/type]',
  aliases: ['smith', 'counterfeit'],

  command: state => (args, player) => {
    if (!args.length) {
      return B.sayAt(player,
        "What are you trying to forge? (e.g., 'forge longsword' or 'forge signature')"
      );
    }

    const parts = args.toLowerCase().split(' ');
    const target = parts[0];
    const subTarget = parts[1];

    const forgeryKeywords = ['signature', 'document', 'paper', 'credits', 'id', 'pass'];

    if (forgeryKeywords.includes(target) || forgeryKeywords.includes(subTarget)) {
      return handleCriminalForgery(state, player, target, subTarget);
    }

    return handlePhysicalSmithing(state, player, target, subTarget);
  }
};

/**
 * Criminal Forgery
 */
function handleCriminalForgery(state, player, type, targetName) {
  const { Broadcast: B } = require('ranvier');

  const skill = player.getSkill('forgery');
  if (!skill || skill.rank <= 0) {
    return B.sayAt(player, "You lack the steady hand for forgery.");
  }

  const kit = [...player.inventory].find(([, i]) => i.getMeta('isForgeryKit'));
  if (!kit) {
    return B.sayAt(player, "You need a forgery kit (inks, parchment, seals) to do this.");
  }

  B.sayAt(player, `<yellow>You begin meticulously faking the ${type}...</yellow>`);

  const dc = 15;
  const result = state.SkillCheck.check(player, 'forgery', ['documents'], dc);

  const doc = state.ItemFactory.create(player.room.area, 'd20:forged_item');
  doc.name = `Forged ${type} (${targetName || 'Official'})`;
  doc.metadata.isCounterfeit = true;
  doc.metadata.detectionDC = result.total;

  player.addItem(doc);
  B.sayAt(player, "<green>The forgery is complete. It looks authentic.</green>");
}

/**
 * Physical Smithing
 */
function handlePhysicalSmithing(state, player, itemType, material) {
  const { Broadcast: B } = require('ranvier');
  const ItemUtil = require('../../lib/ItemUtil');

  const skill = player.getSkill('craft');
  if (!skill || skill.rank <= 0) {
    return B.sayAt(player, "You don't know the first thing about a forge.");
  }

  if (!player.room.metadata.hasForge) {
    return B.sayAt(player, "You need a proper forge and anvil to smith metal items.");
  }

  const rawMaterial = [...player.inventory].find(([, i]) =>
    i.id.includes(material || 'iron_ingot')
  );

  if (!rawMaterial) {
    return B.sayAt(player,
      "You don't have the necessary raw materials (e.g., iron_ingot) in your stash."
    );
  }

  B.sayAt(player, `<red>You heat the ${rawMaterial.name} and begin striking the anvil...</red>`);

  const dc = 15;
  const result = state.SkillCheck.check(player, 'craft', ['blacksmithing'], dc);

  if (!result.success) {
    B.sayAt(player, "<red>The metal cracks under your hammer. You've wasted the materials.</red>");
    player.removeItem(rawMaterial);
    return;
  }

  player.removeItem(rawMaterial);
  const newItem = state.ItemFactory.create(player.room.area, `d20:${itemType}`);
  player.addItem(newItem);

  B.sayAt(player, `<cyan>You have successfully forged ${ItemUtil.display(newItem)}!</cyan>`);
}

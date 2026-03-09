/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/appraise.js
 * PURPOSE: Skill command providing player-facing interaction with the skill system.
 */
'use strict';

const { Broadcast: B } = require('ranvier');
const ArgParser = require('../../lib/ArgParser');
const ItemUtil = require('../../lib/ItemUtil');
const Registry = require('../../data/rules/currency_registry');

module.exports = {
  aliases: ['evaluate', 'value'],
  usage: 'appraise <item> [vendor]',
  command: state => (args, player) => {
    if (!args || !args.length) {
      return B.sayAt(player, "Usage: appraise <item> [vendor]");
    }

    const parts = args.split(' ').map(s => s.trim()).filter(Boolean);
    const itemSearch = parts[0];
    const vendorSearch = parts[1];

    // 1. Find the Item (Room, Inventory, or Vendor List)
    let targetItem = ArgParser.parseDot(itemSearch, player.inventory) || 
                     ArgParser.parseDot(itemSearch, player.room.items);
    let vendor = null;

    if (vendorSearch) {
      vendor = ArgParser.parseDot(vendorSearch, player.room.npcs);
      if (vendor && vendor.hasBehavior('vendor')) {
        const vendorConfig = vendor.getMeta('vendor_config') || { items: {} };
        const itemRef = Object.keys(vendorConfig.items).find(ref => ref.includes(itemSearch));
        if (itemRef) targetItem = state.ItemFactory.getDefinition(itemRef);
      }
    }

    if (!targetItem) {
      return B.sayAt(player, "You don't see anything like that here to appraise.");
    }

    // 2. Resolve DC and Skill (d20 Standard: Intelligence-based Knowledge)
    const skillId = 'knowledge';
    const specialtyPath = ['local']; // Or 'merchant' for Profession
    const difficulty = targetItem.metadata.quality === 'common' ? 'moderate' : 'hard';
    
    const dc = state.DCTables.getDC(player, skillId, specialtyPath, difficulty);
    const result = state.SkillCheck.check(player, skillId, specialtyPath, dc);

    B.sayAt(player, `You examine ${ItemUtil.display(targetItem)} to determine its multiversal value...`);

    // 3. Handle Results
    if (!result.success) {
      B.sayAt(player, `<red>You are unsure of its market value.</red> <gray>(Roll: ${result.roll} Total: ${result.total} vs DC: ${dc})</gray>`);
      return;
    }

    const baseValue = targetItem.metadata.value || 0;
    B.sayAt(player, `<cyan>Estimated Base Value: ${baseValue} Universal Credits (UC).</cyan>`);

    // Mastery Success (d20 Rule: Exceeding DC by 10 reveals hidden details/markups)
    if (vendor && result.total >= (dc + 10)) {
      const multiplier = vendor.getMeta('vendor_multiplier') || 1.0;
      const currencyId = vendor.getMeta('currency_type') || 'gp';
      const currency = Registry[currencyId];

      if (multiplier > 1.0) {
        B.sayAt(player, `<yellow>Insight: This merchant is overcharging by ${Math.round((multiplier - 1) * 100)}%!</yellow>`);
      } else if (multiplier < 1.0) {
        B.sayAt(player, `<green>Insight: You've found a bargain! This is priced below standard market rates.</green>`);
      }
    }

    // Practice Hook is handled automatically by SkillCheck.check(player, ...)
  }
};

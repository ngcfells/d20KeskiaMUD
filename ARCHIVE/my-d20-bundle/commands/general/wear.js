// path: bundles/my-d20-bundle/commands/general/wear.js
'use strict';

const { Broadcast: say } = require('ranvier');
const ItemUtil = require('../../lib/ItemUtil');
const ArgParser = require('../../lib/ArgParser');
const SlotManager = require('../../lib/equipment/SlotManager');

module.exports = {
  aliases: [ 'wield', 'equip' ],
  usage: 'wear <item> [slot]',
  command : (state) => (arg, player) => {
    arg = arg.trim();
    if (!arg.length) return say(player, 'Wear what?');

    const item = ArgParser.parseDot(arg, player.inventory);
    if (!item) return say(player, "You don't have that in your stash.");
    if (!item.metadata.slot) return say(player, `You can't wear ${ItemUtil.display(item)}.`);

    // 1. Level Check
    if (item.level > player.level) return say(player, "You aren't experienced enough for that.");

    // 2. Equip via SlotManager to trigger weight/orbital logic
    try {
      const slotName = item.metadata.slot;
      player.removeItem(item); // Remove from Stasis Stash
      SlotManager.equipItem(player, item, slotName);
      say(player, `<green>You equip:</green> ${ItemUtil.display(item)}<green>.</green>`);
    } catch (err) {
      player.addItem(item); // Return to stash on failure
      say(player, `<red>Error equipping item: ${err.message}</red>`);
    }
  }
};

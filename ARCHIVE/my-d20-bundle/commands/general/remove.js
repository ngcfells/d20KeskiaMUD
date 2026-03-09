// path: bundles/my-d20-bundle/commands/general/remove.js
'use strict';

const { Broadcast: say } = require('ranvier');
const ArgParser = require('../../lib/ArgParser');
const ItemUtil = require('../../lib/ItemUtil');
const SlotManager = require('../../lib/equipment/SlotManager');

module.exports = {
  aliases: [ 'unwield', 'unequip' ],
  usage: 'remove <item>',
  command : state => (arg, player) => {
    if (!arg.length) return say(player, 'Remove what?');

    const result = ArgParser.parseDot(arg, player.equipment, true);
    if (!result) return say(player, "You aren't wearing that.");

    const [slot, item] = result;
    
    // SlotManager handles returning it to stasis and updating weight
    SlotManager.unequipItem(player, slot, item);
    say(player, `<green>You un-equip: </green>${ItemUtil.display(item)}<green>.</green>`);
  }
};

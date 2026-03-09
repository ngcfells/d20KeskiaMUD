// path: bundles/my-d20-bundle/commands/general/drop.js

'use strict';

const { Broadcast } = require('ranvier');
const ArgParser = require('../../lib/ArgParser');
const ItemUtil = require('../../lib/ItemUtil');
const DimensionalInventory = require('../../lib/d20/dimensional-inventory');

module.exports = {
  usage: 'drop <item>',
  command: (state) => (args, player) => {
    args = args.trim();

    if (!args.length) return Broadcast.sayAt(player, 'Drop what?');
    if (!player.room) return Broadcast.sayAt(player, 'You are floating in the nether.');

    // Look in Dimensional Stash OR Equipment (Anatomy)
    const item = ArgParser.parseDot(args, player.inventory) || 
                 ArgParser.parseDot(args, player.equipment);

    if (!item) {
      return Broadcast.sayAt(player, "You aren't carrying anything like that.");
    }

    // Determine if it was a heavy physical item
    const weightReleased = DimensionalInventory.getItemWeightRecursive(item);
    const wasEquipped = player.equipment.has(item);

    if (wasEquipped) {
      player.unequip(item); // Ensure anatomy is cleared
    } else {
      player.removeItem(item); // Remove from Stasis Stash
    }

    player.room.addItem(item);
    
    Broadcast.sayAt(player, `<green>You dropped: </green>${ItemUtil.display(item)}<green>.</green>`);
    
    // Feedback if movement speed improves
    if (weightReleased > 0) {
      const strength = player.getAttribute('strength') || 10;
      const newWeight = DimensionalInventory.getCarriedWeight(player);
      if (newWeight <= (strength * 10) && (newWeight + weightReleased) > (strength * 10)) {
        Broadcast.sayAt(player, "<cyan>You feel much lighter and more mobile.</cyan>");
      }
    }

    player.emit('drop', item);
    item.emit('drop', player);

    for (const npc of player.room.npcs) {
      npc.emit('playerDropItem', player, item);
    }
  }
};

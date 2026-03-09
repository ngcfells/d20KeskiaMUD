// path: bundles/my-d20-bundle/commands/general/put.js
'use strict';

const { Broadcast: B, ItemType } = require('ranvier');
const ArgParser = require('../../lib/ArgParser');
const dot = ArgParser.parseDot;
const ItemUtil = require('../../lib/ItemUtil');
const DimensionalInventory = require('../../lib/d20/dimensional-inventory');

module.exports = {
  usage: 'put <item> <container>',
  command : (state) => (args, player) => {
    args = args.trim();
    if (!args.length) return B.sayAt(player, 'Put what where?');

    const parts = args.split(' ').filter(arg => !arg.match(/in/) && !arg.match(/into/));
    if (parts.length === 1) return B.sayAt(player, "Where do you want to put it?");

    const item = dot(parts[0], player.inventory);
    // Find container in Room, Stash, or Equipped on Anatomy
    const toContainer = dot(parts[1], player.room.items) ||
                        dot(parts[1], player.inventory) ||
                        dot(parts[1], player.equipment);

    if (!item) return B.sayAt(player, "You don't have that in your stash.");
    if (!toContainer) return B.sayAt(player, "You don't see that container.");
    if (toContainer.type !== ItemType.CONTAINER) return B.sayAt(player, "That isn't a container.");
    if (toContainer.isInventoryFull()) return B.sayAt(player, "That container is full.");
    if (toContainer.closed) return B.sayAt(player, "It is closed.");

    // Remove from Stasis/Weightless Stash
    player.removeItem(item);
    
    // Add to Physical Container (Recursive weight will now apply in movement.js)
    toContainer.addItem(item);

    B.at(player, `<green>You move </green>${ItemUtil.display(item)}<green> to </green>${ItemUtil.display(toContainer)}<green>.</green>`);
    
    // Warn if this move makes them encumbered
    const weight = DimensionalInventory.getCarriedWeight(player);
    const heavyLoad = (player.getAttribute('strength') || 10) * 10;
    if (weight > heavyLoad) {
      B.sayAt(player, "\n<yellow>The weight of the container settles heavily on your shoulders.</yellow>");
    } else {
      B.sayAt(player, "");
    }

    item.emit('put', player, toContainer);
    player.emit('put', item, toContainer);
  }
};

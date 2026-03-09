// path: bundles/my-d20-bundle/commands/general/get.js

'use strict';

const ItemUtil = require('../../lib/ItemUtil');

module.exports = {
  usage: 'get <item> [container]',
  aliases: ['take', 'pick', 'loot'],
  category: 'inventory',
  tags: ['inventory', 'items', 'pickup'],
  requires: ['room', 'inventory-space'],

  command: state => (args, player, arg0) => {
    const Msg = state.Msg;
    const Errors = state.Errors;
    const Logger = state.CommandLogger;
    const Inventory = state.Inventory;
    const Resolve = state.TargetResolver;

    Logger.log(player, 'get', { args });

    if (!args.length) {
      return Errors.notFound(player, 'anything to get');
    }

    if (!player.room) {
      return Errors.cannot(player, 'interact with items while not in a room');
    }

    if (!Inventory.canAdd(player)) {
      return Errors.cannot(player, 'carry more items');
    }

    // "loot" → "get all <args>"
    if (arg0 === 'loot') {
      args = ('all ' + args).trim();
    }

    let parts = args.split(' ').filter(arg => !arg.match(/from/));
    if (parts.length > 1 && parts[0] === 'up') {
      parts = parts.slice(1);
    }

    let container = null;
    let source = null;
    let search = null;

    // No container
    if (parts.length === 1) {
      search = parts[0];
      source = player.room.items;
    }

    // With container
    else {
      container = Resolve.resolve(player, parts[1], {
        includeRoomItems: true,
        includeEquipment: true,
        includeInventory: true
      });

      if (!container) {
        return Errors.notFound(player, parts[1]);
      }

      // Improved container detection
      const isContainer =
        container.isContainer ||
        container.metadata?.isContainer ||
        (container.type && container.type.toLowerCase() === 'container');

      if (!isContainer) {
        return Errors.cannot(player, `use ${container.name} as a container`);
      }

      if (container.closed) {
        return Errors.cannot(player, `${container.name} while it is closed`);
      }

      search = parts[0];
      source = container.inventory;
    }

    // "get all"
    if (search === 'all') {
      const items = [...source].map(i => Array.isArray(i) ? i[1] : i);

      if (!items.length) {
        return Errors.notFound(player, 'anything to take');
      }

      for (const item of items) {
        if (!Inventory.canAdd(player)) {
          Msg.info(player, "Your stash is full.");
          break;
        }
        pickup(item, container, player, state);
      }
      return;
    }

    // Single item
    const item = Resolve.resolve(player, search, {
      includeRoomItems: true,
      includeInventory: false
    });

    if (!item) {
      return Errors.notFound(player, search);
    }

    pickup(item, container, player, state);
  }
};

function pickup(item, container, player, state) {
  const Msg = state.Msg;
  const Inventory = state.Inventory;

  if (item.metadata.noPickup) {
    return Msg.error(player, `${item.name} cannot be picked up.`);
  }

  if (container) {
    container.removeItem(item);
  } else {
    player.room.removeItem(item);
  }

  Inventory.add(player, item);

  Msg.success(player, `You stash: ${item.name}.`);

  // Emit all relevant events
  state.ItemEvents.emitInteraction(item, 'get', player);
  state.PlayerEvents.emitAction(player, 'get', { item });
  state.InventoryEvents.emitChange(player, 'add', item);
}

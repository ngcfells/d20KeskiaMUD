// path: bundles/my-d20-bundle/commands/general/drink.js

'use strict';

const ItemUtil = require('../../lib/ItemUtil');

module.exports = {
  usage: 'drink <item>',
  category: 'inventory',
  tags: ['consumable', 'drink', 'usable', 'potion', 'liquid'],
  requires: ['inventory', 'room', 'consumable'],
  help: 'drink',

  command: state => (args, player) => {
    const Msg = state.Msg;
    const Errors = state.Errors;
    const Logger = state.CommandLogger;
    const Inventory = state.Inventory;
    const Resolve = state.TargetResolver;
    const LiquidManager = state.LiquidManager;
    const ItemEvents = state.ItemEvents;
    const PlayerEvents = state.PlayerEvents;
    const InventoryEvents = state.InventoryEvents;

    Logger.log(player, 'drink', { args });

    if (!args || !args.length) {
      return Errors.notFound(player, 'anything to drink');
    }

    const item = Resolve.resolve(player, args, {
      includeInventory: true,
      includeEquipment: true,
      includeRoomItems: true,
      includeContainerItems: true,
      includeNpcItems: true
    });

    if (!item) {
      return Msg.error(player, "You don't have that.");
    }

    const drinkable = item.getBehavior('drinkable');
    if (!drinkable && !item.metadata?.liquidType) {
      return Msg.error(player, "You can't drink that.");
    }

    const inStasis = Inventory.isInStasis ? Inventory.isInStasis(item, player) : false;

    if (!inStasis && item.metadata?.temperature > 50) {
      Msg.error(player, `Ouch! The ${ItemUtil.display(item)} is still scalding hot!`);
    }

    Msg.action(player, `You drink ${ItemUtil.display(item)}.`);

    ItemEvents.emitInteraction(item, 'drink', player);
    PlayerEvents.emitAction(player, 'drink', { item });

    const liquidId = (drinkable && drinkable.type) || item.metadata?.liquidType;
    if (liquidId && LiquidManager) {
      LiquidManager.applyEffects(state, player, item, liquidId);
    }

    const usable = item.getBehavior('usable');
    if (usable && usable.spell) {
      state.CommandManager.get('use').execute(item.name, player);
    } else {
      if (Inventory.contains && Inventory.contains(player, item)) {
        Inventory.remove(player, item);
      } else if (player.room && player.room.items.has(item)) {
        player.room.removeItem(item);
      }
      InventoryEvents.emitChange(player, 'remove', item);
    }
  }
};

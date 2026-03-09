// path: bundles/my-d20-bundle/commands/general/give.js

'use strict';

const ItemUtil = require('../../lib/ItemUtil');

module.exports = {
  usage: 'give <item> to <target>',
  aliases: ['hand', 'offer'],
  category: 'inventory',
  tags: ['inventory', 'trade', 'social'],
  requires: ['room', 'inventory', 'target-present'],
  help: 'give',

  command: state => (args, player) => {
    const Msg = state.Msg;
    const Errors = state.Errors;
    const Logger = state.CommandLogger;
    const Inventory = state.Inventory;
    const Resolve = state.TargetResolver;

    Logger.log(player, 'give', { args });

    if (!args || !args.length) {
      return Errors.notFound(player, 'what to give and to whom');
    }

    // normalize: "give sword to bob" / "give sword bob"
    let parts = args.split(' ').filter(Boolean);
    const toIndex = parts.indexOf('to');
    let itemArg, targetArg;

    if (toIndex !== -1) {
      itemArg = parts.slice(0, toIndex).join(' ');
      targetArg = parts.slice(toIndex + 1).join(' ');
    } else {
      itemArg = parts[0];
      targetArg = parts.slice(1).join(' ');
    }

    if (!itemArg || !targetArg) {
      return Msg.info(player, "Usage: give <item> to <target>");
    }

    // resolve item from inventory/equipment
    const item = Resolve.resolve(player, itemArg, {
      includeInventory: true,
      includeEquipment: true
    });

    if (!item) {
      return Msg.error(player, "You don't have that.");
    }

    // resolve target: players, npcs, followers, party, role aliases
    const target = Resolve.resolve(player, targetArg, {
      includeRoomPlayers: true,
      includeRoomNpcs: true,
      includeFollowers: true,
      includeSummons: true,
      includeParty: true,
      includeRoleAliases: true
    });

    if (!target) {
      return Msg.error(player, "They aren't here.");
    }

    if (target === player) {
      return Msg.info(player, "You hand it to yourself. Progress!");
    }

    const InventoryEvents = state.InventoryEvents;
    const PlayerEvents = state.PlayerEvents;
    const NpcEvents = state.NpcEvents;

    if (!Inventory.canAdd(target)) {
      return Msg.error(player, `${target.name}'s Dimensional Stash is full.`);
    }

    // simple NPC acceptance hook (behavior-driven)
    if (target.isNpc) {
      const accepts = target.getBehavior('accepts');
      if (accepts && Array.isArray(accepts) && !accepts.includes(item.entityReference)) {
        Msg.info(player, `${target.name} doesn't seem interested in that.`);
        NpcEvents.emitInteraction(target, 'refuse-gift', player);
        return;
      }
    }

    Inventory.remove(player, item);
    Inventory.add(target, item);

    Msg.success(player, `You give ${target.name}: ${ItemUtil.display(item)}.`);
    if (!target.isNpc) {
      Msg.success(target, `${player.name} gives you: ${ItemUtil.display(item)}.`);
      Msg.info(target, '(The item enters your Dimensional Stasis Stash.)');
    }

    PlayerEvents.emitAction(player, 'give', { target, item });
    PlayerEvents.emitAction(target, 'receive', { from: player, item });
    InventoryEvents.emitChange(player, 'remove', item);
    InventoryEvents.emitChange(target, 'add', item);

    if (target.isNpc) {
      NpcEvents.emitInteraction(target, 'receive', player);
      NpcEvents.emitInteraction(target, 'gift', { from: player, item });
    }

    player.emit('give', target, item);
    target.emit('receive', player, item);
  }
};

// path: bundles/my-d20-bundle/commands/general/equipment.js

'use strict';

const ItemUtil = require('../../lib/ItemUtil');

module.exports = {
  usage: 'equipment',
  aliases: ['worn'],
  category: 'inventory',
  tags: ['equipment', 'status', 'character-sheet'],
  requires: ['room'],

  command: state => (args, player) => {
    const Msg = state.Msg;
    const Logger = state.CommandLogger;

    Logger.log(player, 'equipment', {});

    if (!player.equipment.size) {
      Msg.info(player, "You are not wearing any equipment.");
      state.PlayerEvents.emitAction(player, 'equipment-check', { empty: true });
      return;
    }

    Msg.info(player, "Currently Equipped:");

    for (const [slot, item] of player.equipment) {
      Msg.info(player, `  <${slot}> ${ItemUtil.display(item)}`);
    }

    state.PlayerEvents.emitAction(player, 'equipment-check', { empty: false });
  }
};

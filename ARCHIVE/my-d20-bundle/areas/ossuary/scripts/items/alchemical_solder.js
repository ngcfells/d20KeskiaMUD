// path: bundles\my-d20-bundle\areas\ossuary\scripts\items\alchemical_solder.js
'use strict';

module.exports = {
  listeners: {
    use: state => function (args, player) {
      const room = player.room;

      // Must match the actual room ID
      if (room.id !== 'ossuary:10') {
        return player.say("This solder is designed for high-resonance bronze repair. It's useless here.");
      }

      // Check if bell is already repaired
      if (room.getMeta('bell_repaired')) {
        return player.say("The bell's crack has already been sealed.");
      }

      // Optional: check for bell presence
      if (!room.getMeta('has_bell')) {
        return player.say("There is nothing here that requires soldering.");
      }

      // Perform repair
      player.say("\n<cyan>You apply the alchemical solder to the jagged crack in the bell.</cyan>");
      player.say("The resin glows briefly as it bonds with the bronze, sealing the fissure perfectly.");

      room.setMeta('bell_repaired', true);
      room.setMeta('runes_silenced', false);

      room.broadcastExcept(player, `<cyan>${player.name} expertly repairs the massive bronze bell.</cyan>`);

      // Destroy the item
      const item = this;
      player.removeItem(item);
      item.destroy();

      // Emit event for other scripts
      state.RoomManager.emit('bellRepaired', room, player);
    }
  }
};

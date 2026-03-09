'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  usage: 'scan',
  command: state => (args, player) => {
    const TrapManager = state.TrapManager;

    for (const exit of player.room.exits) {
      const room = state.RoomManager.getRoom(exit.roomId);

      B.at(player, `(${exit.direction}) ${room.title}`);

      const hasEntities = room.npcs.size || room.players.size;
      const visibleTraps = TrapManager.getVisibleTraps(room, player);

      if (hasEntities || visibleTraps.length > 0) {
        B.sayAt(player, ':');
      } else {
        B.sayAt(player);
      }

      for (const npc of room.npcs) {
        B.sayAt(player, `  [NPC] ${npc.name}`);
      }

      for (const pc of room.players) {
        B.sayAt(player, `  [Player] ${pc.name}`);
      }

      if (visibleTraps.length > 0) {
        B.sayAt(player, `  <yellow>[Traps detected]</yellow>`);
      }

      B.sayAt(player);
    }
  }
};

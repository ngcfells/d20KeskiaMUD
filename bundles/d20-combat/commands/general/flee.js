'use strict';

const { Broadcast: B } = require('ranvier');
const Combat = require('../../lib/combat/combat');

module.exports = {
  usage: 'flee [direction]',
  command: state => (direction, player) => {

    if (!player.isInCombat()) {
      return B.sayAt(player, "You jump at the sight of your own shadow.");
    }

    const room = player.room;
    if (!room) {
      return B.sayAt(player, "You can't flee from here.");
    }

    // ─────────────────────────────────────────────
    // 1. Determine exit
    // ─────────────────────────────────────────────
    let exit = null;

    if (direction) {
      exit = room.getExits().find(e => e.direction === direction.toLowerCase());
      if (!exit) {
        return B.sayAt(player, "You can't flee that way!");
      }
    } else {
      const exits = room.getExits();
      if (!exits.length) {
        return B.sayAt(player, "You can't find anywhere to run!");
      }
      exit = exits[Math.floor(Math.random() * exits.length)];
    }

    const nextRoom = state.RoomManager.getRoom(exit.roomId);
    if (!nextRoom) {
      return B.sayAt(player, "You can't find anywhere to run!");
    }

    // ─────────────────────────────────────────────
    // 2. Door check
    // ─────────────────────────────────────────────
    const door = room.getDoor(nextRoom) || nextRoom.getDoor(room);
    if (door && (door.locked || door.closed)) {
      return B.sayAt(player, "In your panic you run into a closed door!");
    }

    // ─────────────────────────────────────────────
    // 3. Break combat
    // ─────────────────────────────────────────────
    Combat.stopCombat(player);

    B.sayAt(player, "You flee from the battle!");

    // ─────────────────────────────────────────────
    // 4. Move the player
    // ─────────────────────────────────────────────
    player.moveTo(nextRoom, () => {
      B.sayAt(player, "You manage to escape!");
      player.emit('move');
    });
  }
};

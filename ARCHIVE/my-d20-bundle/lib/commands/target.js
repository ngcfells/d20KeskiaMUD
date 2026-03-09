// bundles/commands/lib/target.js
'use strict';

module.exports = function getTarget(state, player, name) {
  const room = player.room;
  if (!room) return null;

  name = name.toLowerCase();

  const candidates = [
    ...room.players,
    ...room.npcs
  ];

  return candidates.find(ent => ent.name.toLowerCase() === name);
};

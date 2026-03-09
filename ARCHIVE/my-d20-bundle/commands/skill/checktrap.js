'use strict';

const { Broadcast } = require('ranvier');

/**
 * CHECKTRAP — Inspect traps you own or have spotted.
 *
 * Usage:
 *   checktrap
 *   checktrap <type>
 *
 * Shows:
 *   - type
 *   - armed/disarmed
 *   - target
 *   - direction
 *   - wildlife/combat
 *   - owner (if you are the owner)
 */

module.exports = {
  aliases: ['checktrap'],
  usage: 'checktrap [type]',
  command: state => (player, args) => {
    const typeFilter = args?.trim().toLowerCase() || null;
    const traps = player.room.getMeta('traps') || {};

    const visibleTraps = Object.values(traps).filter(trap => {
      const isOwner = trap.owner === player.uuid;
      const isSpotter = (trap.spottedBy || []).includes(player.uuid);

      // Wildlife traps: visible once discovered by anyone
      if (trap.wildlifeTrap && trap.armed) {
        return true;
      }

      // Combat traps: only visible to owner or spotter
      if (trap.combatTrap && (isOwner || isSpotter)) {
        return true;
      }

      // Disarmed traps: owner can always see them
      if (!trap.armed && isOwner) {
        return true;
      }

      return false;
    });

    const filtered = typeFilter
      ? visibleTraps.filter(t => t.type === typeFilter)
      : visibleTraps;

    if (filtered.length === 0) {
      return Broadcast.sayAt(player, "You don't see any traps you recognize here.");
    }

    Broadcast.sayAt(player, "You examine the traps in the area:");

    for (const trap of filtered) {
      const isOwner = trap.owner === player.uuid;
      const status = trap.armed ? 'armed' : 'disarmed';
      const kind = trap.wildlifeTrap ? 'wildlife' : (trap.combatTrap ? 'combat' : 'unknown');
      const dir = trap.direction ? `, direction: ${trap.direction}` : '';
      const tgt = trap.target ? `, target: ${trap.target}` : '';

      let line = ` - ${trap.type} trap (${status}, ${kind}${dir}${tgt})`;
      if (isOwner) {
        line += ' [yours]';
      }

      Broadcast.sayAt(player, line);
    }
  }
};

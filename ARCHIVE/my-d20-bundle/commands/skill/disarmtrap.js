'use strict';

const { Broadcast } = require('ranvier');

/**
 * DISARMTRAP — Disarm a persistent trap.
 *
 * Usage:
 *   disarmtrap <type>
 *
 * Examples:
 *   disarmtrap snare
 *   disarmtrap tripwire
 *
 * Uses disable_device skill and full modifier stack via SkillCheck.
 */

module.exports = {
  aliases: ['disarmtrap', 'disarm'],
  usage: 'disarmtrap <type>',
  command: state => (player, args) => {
    const skillCheck = state.SkillCheck;
    const synergy = state.Synergy;
    const dcTables = state.DCTables;

    if (!args) {
      return Broadcast.sayAt(player, "Disarm what kind of trap?");
    }

    const trapType = args.trim().toLowerCase();
    const traps = player.room.getMeta('traps') || {};

    const trapEntries = Object.values(traps).filter(t => t.armed && t.type === trapType);
    if (trapEntries.length === 0) {
      return Broadcast.sayAt(player, "You don't see any armed traps of that type here.");
    }

    // For now, disarm the first matching trap
    const trap = trapEntries[0];

    // Check visibility: must be owner or spotter, or have detected it
    const isOwner = trap.owner === player.uuid;
    const isSpotter = (trap.spottedBy || []).includes(player.uuid);

    if (!isOwner && !isSpotter) {
      return Broadcast.sayAt(player, "You don't know where that trap is.");
    }

    // Determine DC from trap metadata
    const baseDC = trap.disarmDC || dcTables.getDC(player, 'disable_device', [], trap.difficulty || 'moderate');

    // Trap‑setter and spotter bonuses
    let circumstance = 0;
    if (isOwner) {
      circumstance += 4; // owner disarm bonus
    }
    if (isSpotter && !isOwner) {
      circumstance += 4; // spotter disarm bonus
    }

    const synergyBonus = synergy.getBonus(player, 'disable_device', []);
    const result = skillCheck.check(player, 'disable_device', [], baseDC, {
      circumstance: circumstance + synergyBonus
    });

    Broadcast.sayAt(player, `You attempt to disarm the ${trap.type} trap...`);

    if (!result.success) {
      Broadcast.sayAt(player, "You fail to disarm the trap!");

      // Failure: chance to trigger the trap
      const triggerRoll = Math.floor(Math.random() * 20) + 1;
      const triggerThreshold = 10; // tuneable

      if (triggerRoll >= triggerThreshold) {
        Broadcast.sayAt(player, "Your mistake triggers the trap!");

        // Apply trap effects here (damage, status, etc.)
        // Respect PvP rules: only affect players in PvP zones
        const roomPvp = player.room.getMeta('pvpEnabled') || false;
        const isWildlifeTrap = trap.wildlifeTrap;
        const isCombatTrap = trap.combatTrap;

        if (isWildlifeTrap) {
          // Wildlife trap triggered by player: apply reduced effect
          // (You can expand this later.)
          Broadcast.sayAt(player, "You get caught in your own snare!");
        } else if (isCombatTrap && roomPvp) {
          Broadcast.sayAt(player, "The trap lashes out at you!");
        }

        // Mark trap as sprung
        trap.armed = false;
        player.room.setMeta('traps', traps);
      }

      return;
    }

    trap.armed = false;
    player.room.setMeta('traps', traps);

    Broadcast.sayAt(player, "You successfully disarm the trap.");
  }
};

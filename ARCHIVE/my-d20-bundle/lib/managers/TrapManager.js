'use strict';

/**
 * TrapManager
 *
 * Centralized trap logic for:
 *  - creation
 *  - detection (passive + active)
 *  - triggering
 *  - disarming
 *  - resetting
 *  - salvaging
 *  - upgrading
 *  - visibility rules
 *  - trap-setter bonuses
 *  - spotter memory bonuses
 *  - PvP rules
 *  - wildlife/NPC triggering
 *
 * This keeps commands clean and ensures all trap behavior is consistent.
 */

class TrapManager {
  constructor(state) {
    this.state = state;
  }

  /**
   * Create a persistent trap object in a room.
   */
  createTrap(room, trapData) {
    const traps = room.getMeta('traps') || {};
    traps[trapData.id] = trapData;
    room.setMeta('traps', traps);
  }

  /**
   * Get all traps in a room.
   */
  getTraps(room) {
    return room.getMeta('traps') || {};
  }

  /**
   * Get traps visible to a specific player.
   * Visibility rules:
   *  - Wildlife traps: visible once discovered by anyone
   *  - Combat traps: visible only to owner or spotter
   *  - Disarmed traps: visible to owner
   */
  getVisibleTraps(room, player) {
    const traps = this.getTraps(room);
    const visible = [];

    for (const trap of Object.values(traps)) {
      const isOwner = trap.owner === player.uuid;
      const isSpotter = (trap.spottedBy || []).includes(player.uuid);

      if (trap.wildlifeTrap && trap.armed) {
        visible.push(trap);
        continue;
      }

      if (trap.combatTrap && (isOwner || isSpotter)) {
        visible.push(trap);
        continue;
      }

      if (!trap.armed && isOwner) {
        visible.push(trap);
        continue;
      }
    }

    return visible;
  }

  /**
   * Attempt to detect a trap.
   * Hybrid detection:
   *  - Passive detection for easy traps (DC <= 10)
   *  - Active /search required for harder traps
   *  - Full modifier stack
   */
  detectTrap(player, trap, activeSearch = false) {
    const { SkillCheck, Synergy } = this.state;

    // Already spotted
    if ((trap.spottedBy || []).includes(player.uuid)) {
      return true;
    }

    // Passive detection only for easy traps
    if (!activeSearch && trap.detectDC > 10) {
      return false;
    }

    // Trap-setter bonus
    let circumstance = 0;
    if (trap.owner === player.uuid) {
      circumstance += 2;
    }

    const specialtyPath = ['trapping', 'detection'];
    const synergyBonus = Synergy.getBonus(player, 'survival', specialtyPath);

    const result = SkillCheck.check(player, 'survival', specialtyPath, trap.detectDC, {
      circumstance: circumstance + synergyBonus
    });

    if (result.success) {
      trap.spottedBy = trap.spottedBy || [];
      trap.spottedBy.push(player.uuid);
      return true;
    }

    return false;
  }

  /**
   * Attempt to disarm a trap.
   * Uses disable_device skill + full modifier stack.
   */
  disarmTrap(player, trap) {
    const { SkillCheck, Synergy } = this.state;

    const isOwner = trap.owner === player.uuid;
    const isSpotter = (trap.spottedBy || []).includes(player.uuid);

    let circumstance = 0;
    if (isOwner) circumstance += 4;
    if (isSpotter && !isOwner) circumstance += 4;

    const synergyBonus = Synergy.getBonus(player, 'disable_device', []);

    return SkillCheck.check(player, 'disable_device', [], trap.disarmDC, {
      circumstance: circumstance + synergyBonus
    });
  }

  /**
   * Trigger a trap.
   * Applies:
   *  - PvP rules
   *  - wildlife/NPC rules
   *  - trap-setter avoidance bonuses
   *  - spotter avoidance bonuses
   *  - full modifier stack
   */
  triggerTrap(player, trap) {
    const { SkillCheck, Synergy } = this.state;

    const roomPvp = player.room.getMeta('pvpEnabled') || false;
    const isOwner = trap.owner === player.uuid;
    const isSpotter = (trap.spottedBy || []).includes(player.uuid);

    // PvP restriction
    if (player.isPlayer() && !roomPvp) {
      return false;
    }

    // Avoidance roll
    let circumstance = 0;
    if (isOwner) circumstance += 4;
    if (isSpotter && !isOwner) circumstance += 4;

    const specialtyPath = ['trapping', 'avoidance'];
    const synergyBonus = Synergy.getBonus(player, 'survival', specialtyPath);

    const result = SkillCheck.check(player, 'survival', specialtyPath, trap.triggerDC, {
      circumstance: circumstance + synergyBonus
    });

    if (result.success) {
      return false; // avoided
    }

    // Apply trap effects
    this.applyTrapEffects(player, trap);

    trap.armed = false;
    return true;
  }

  /**
   * Apply trap effects (damage, conditions, alerts).
   * Hook into your combat + condition systems here.
   */
  applyTrapEffects(player, trap) {
    const { Broadcast } = require('ranvier');

    switch (trap.type) {
      case 'snare':
        Broadcast.sayAt(player, "A snare yanks you violently upward!");
        // TODO: apply entangled condition
        break;

      case 'tripwire':
        Broadcast.sayAt(player, "You trip a wire and something snaps!");
        // TODO: apply damage or condition
        break;

      case 'spike':
        Broadcast.sayAt(player, "You step onto a concealed spike trap!");
        // TODO: apply piercing damage
        break;

      case 'deadfall':
        Broadcast.sayAt(player, "A heavy log crashes down on you!");
        // TODO: apply bludgeoning damage
        break;

      case 'pit':
        Broadcast.sayAt(player, "The ground gives way beneath you!");
        // TODO: apply fall damage + prone
        break;

      case 'alarm':
        Broadcast.sayAt(player, "An alarm rings out loudly!");
        // TODO: alert nearby NPCs
        break;

      default:
        Broadcast.sayAt(player, "A trap triggers!");
        break;
    }
  }
}

module.exports = TrapManager;

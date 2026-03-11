'use strict';

/**
 * D20CombatManager
 *
 * Round-based, class-agnostic d20 combat orchestrator.
 * - Tracks who is in combat with whom
 * - Rolls and stores initiative
 * - Advances combat once per tick per room
 * - Delegates actual attack resolution to lib/combat/attack.js
 */

const Attack = require('./combat/attack');

class D20CombatManager {
  /**
   * Main round heartbeat, called once per combat tick per room.
   * For now: each combatant gets one attack against their current target.
   */
  static updateRound(state, room) {
    if (!room) return;

    const combatants = [...room.players, ...room.npcs].filter(c => c.isInCombat && c.isInCombat());

    // Sort by initiative (high to low)
    combatants.sort((a, b) => (b.getMeta('initiative') || 0) - (a.getMeta('initiative') || 0));

    for (const attacker of combatants) {
      if (!attacker.isInCombat || !attacker.isInCombat()) continue;

      const target = attacker.combatData && attacker.combatData.target;
      if (!target || !target.room || target.room !== attacker.room) {
        continue;
      }

      // Single attack resolution using the new Attack orchestrator
      Attack.resolve(attacker, target);
    }
  }

  /**
   * Begin combat between two entities.
   */
  static startCombat(attacker, target) {
    if (!attacker || !target) return;

    attacker.combatData = attacker.combatData || {};
    target.combatData = target.combatData || {};

    attacker.combatData.target = target;
    target.combatData.target = target.combatData.target || attacker;

    attacker.setMeta('inCombat', true);
    target.setMeta('inCombat', true);

    if (!attacker.getMeta('initiative')) {
      attacker.setMeta('initiative', Math.floor(Math.random() * 20) + 1);
    }
    if (!target.getMeta('initiative')) {
      target.setMeta('initiative', Math.floor(Math.random() * 20) + 1);
    }
  }

  /**
   * Stop combat for an entity.
   */
  static stopCombat(entity) {
    if (!entity) return;

    entity.setMeta('inCombat', false);
    entity.setMeta('initiative', null);

    if (entity.combatData) {
      entity.combatData.target = null;
    }
  }

  /**
   * Per-entity combat tick.
   * Behaviors call this, but it delegates to the room-level engine.
   */
  static updateCombatRound(entity) {
    if (!entity || !entity.room) return;

    const state = entity.room.area.state;
    this.updateRound(state, entity.room);
  }

  /**
   * Find a valid combat target in the room.
   */
  static findCombatant(player, args) {
    if (!player || !player.room) return null;
    if (!args) return null;

    const name = args.toLowerCase();

    // Search NPCs
    for (const [, npc] of player.room.npcs) {
      if (npc.name.toLowerCase().includes(name)) {
        return npc;
      }
    }

    // Search players
    for (const [, other] of player.room.players) {
      if (other === player) continue;
      if (other.name.toLowerCase().includes(name)) {
        return other;
      }
    }

    return null;
  }
}

module.exports = D20CombatManager;

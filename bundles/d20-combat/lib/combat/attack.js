'use strict';

const AttackRoll = require('./attack-roll');
const Defense = require('../defense/defense');
const Damage = require('../damage/damage');
const CombatStates = require('./combat-states');

/**
 * Attack Orchestrator
 * ---------------------------------------------------------
 * This is the central pipeline for resolving an attack:
 *
 *  1. Determine attack context (weapon, unarmed, natural)
 *  2. Build attack roll (modifiers, traits, effects)
 *  3. Resolve hit/miss vs target AC
 *  4. Handle critical threat + confirmation
 *  5. Build damage packets
 *  6. Apply damage (resistances, vulnerabilities, DR)
 *  7. Emit combat events (before/after attack, before/after damage)
 *  8. Update combat states (engaged, flanked, etc.)
 */

class Attack {
  /**
   * Execute a full attack sequence.
   * @param {Character} attacker
   * @param {Character} target
   * @param {object} options { weaponOverride, attackType }
   */
  static resolve(attacker, target, options = {}) {
    const weapon = options.weaponOverride || attacker.getEquippedWeapon();
    const attackType = options.attackType || 'standard';

    // Ensure combat states exist
    attacker.combatStates = attacker.combatStates || new CombatStates(attacker);
    target.combatStates = target.combatStates || new CombatStates(target);

    // ─────────────────────────────────────────────
    // 1. Pre-attack event hook
    // ─────────────────────────────────────────────
    attacker.emit?.('beforeAttack', { attacker, target, weapon, attackType });

    // ─────────────────────────────────────────────
    // 2. Build and resolve attack roll
    // ─────────────────────────────────────────────
    const rollResult = AttackRoll.resolve(attacker, target, weapon);

    // Miss on natural 1
    if (rollResult.natural === 1) {
      return Attack._miss(attacker, target, weapon, rollResult, false);
    }

    // ─────────────────────────────────────────────
    // 3. Resolve hit/miss vs AC
    // ─────────────────────────────────────────────
    const ac = Defense.getAC(target);
    const hit = rollResult.total >= ac;

    // Miss
    if (!hit) {
      return Attack._miss(attacker, target, weapon, rollResult, false);
    }

    // ─────────────────────────────────────────────
    // 4. Critical threat + confirmation
    // ─────────────────────────────────────────────
    let isCrit = false;

    if (rollResult.isThreat) {
      const confirm = AttackRoll.confirm(attacker, target, weapon);
      if (confirm.hit) {
        isCrit = true;
      }
    }

    // ─────────────────────────────────────────────
    // 5. Build damage packets
    // ─────────────────────────────────────────────
    const damagePackets = Damage.buildPackets(attacker, weapon, { crit: isCrit });

    // ─────────────────────────────────────────────
    // 6. Pre-damage event hook
    // ─────────────────────────────────────────────
    attacker.emit?.('beforeDamage', {
      attacker,
      target,
      weapon,
      packets: damagePackets,
      crit: isCrit
    });

    // ─────────────────────────────────────────────
    // 7. Apply damage (resistance, DR, vulnerabilities)
    // ─────────────────────────────────────────────
    const applied = Damage.apply(target, damagePackets);

    // ─────────────────────────────────────────────
    // 8. Post-damage event hook
    // ─────────────────────────────────────────────
    attacker.emit?.('afterDamage', {
      attacker,
      target,
      weapon,
      packets: applied,
      crit: isCrit
    });

    // ─────────────────────────────────────────────
    // 9. Update combat states
    // ─────────────────────────────────────────────
    attacker.combatStates.add('engaged');
    target.combatStates.add('engaged');

    // ─────────────────────────────────────────────
    // 10. Return full attack result
    // ─────────────────────────────────────────────
    return {
      type: 'hit',
      crit: isCrit,
      roll: rollResult,
      ac,
      damage: applied,
      attacker,
      target,
      weapon
    };
  }

  // ─────────────────────────────────────────────
  // MISS HANDLER
  // ─────────────────────────────────────────────
  static _miss(attacker, target, weapon, rollResult, isCritFail) {
    attacker.emit?.('attackMiss', {
      attacker,
      target,
      weapon,
      roll: rollResult,
      critFail: isCritFail
    });

    return {
      type: 'miss',
      critFail: isCritFail,
      roll: rollResult,
      attacker,
      target,
      weapon
    };
  }
}

module.exports = Attack;

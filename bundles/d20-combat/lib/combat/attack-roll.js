'use strict';

const D20Utils = require('../../../d20-core/d20/d20Utils');

/**
 * Attack Roll Engine
 * ---------------------------------------------------------
 * Responsibilities:
 *  - Build attack roll modifiers (traits, effects, states, weapon bonuses)
 *  - Handle advantage/disadvantage
 *  - Handle critical threat detection
 *  - Handle critical confirmation
 *  - Return a complete roll breakdown for attack.js
 */

module.exports = {
  /**
   * Resolve an attack roll.
   * @param {Character} attacker
   * @param {Character} target
   * @param {Item} weapon
   * @returns {object} { natural, total, modifiers, isThreat }
   */
  resolve(attacker, target, weapon) {
    const breakdown = {
      baseRoll: 0,
      attackBonus: 0,
      abilityMod: 0,
      weaponBonus: 0,
      traitBonus: 0,
      effectBonus: 0,
      stateBonus: 0,
      miscBonus: 0,
      advantage: false,
      disadvantage: false
    };

    // ─────────────────────────────────────────────
    // 1. Determine advantage/disadvantage
    // ─────────────────────────────────────────────
    if (attacker.hasTrait('attack_advantage')) breakdown.advantage = true;
    if (attacker.hasTrait('attack_disadvantage')) breakdown.disadvantage = true;

    const effectMods = attacker.getEffectModifiers?.('attack') || [];
    for (const mod of effectMods) {
      if (mod.advantage) breakdown.advantage = true;
      if (mod.disadvantage) breakdown.disadvantage = true;
    }

    // ─────────────────────────────────────────────
    // 2. Roll the d20
    // ─────────────────────────────────────────────
    const roll1 = Math.floor(Math.random() * 20) + 1;
    const roll2 = Math.floor(Math.random() * 20) + 1;

    if (breakdown.advantage && !breakdown.disadvantage) {
      breakdown.baseRoll = Math.max(roll1, roll2);
    } else if (breakdown.disadvantage && !breakdown.advantage) {
      breakdown.baseRoll = Math.min(roll1, roll2);
    } else {
      breakdown.baseRoll = roll1;
    }

    // ─────────────────────────────────────────────
    // 3. Ability modifier (STR for melee, DEX for finesse/ranged)
    // ─────────────────────────────────────────────
    const isRanged = weapon?.getMeta('ranged') === true;
    const isFinesse = weapon?.getMeta('finesse') === true;

    if (isRanged) {
      breakdown.abilityMod = D20Utils.getModifier(attacker.getAttribute('dexterity') || 10);
    } else if (isFinesse) {
      const strMod = D20Utils.getModifier(attacker.getAttribute('strength') || 10);
      const dexMod = D20Utils.getModifier(attacker.getAttribute('dexterity') || 10);
      breakdown.abilityMod = Math.max(strMod, dexMod);
    } else {
      breakdown.abilityMod = D20Utils.getModifier(attacker.getAttribute('strength') || 10);
    }

    // ─────────────────────────────────────────────
    // 4. Weapon bonuses
    // ─────────────────────────────────────────────
    if (weapon) {
      breakdown.weaponBonus += weapon.getMeta('attackBonus') || 0;
    }

    // ─────────────────────────────────────────────
    // 5. Trait bonuses
    // ─────────────────────────────────────────────
    if (attacker.hasTrait('weapon_focus')) {
      breakdown.traitBonus += 1;
    }

    if (attacker.hasTrait('greater_weapon_focus')) {
      breakdown.traitBonus += 1;
    }

    // ─────────────────────────────────────────────
    // 6. Effect bonuses
    // ─────────────────────────────────────────────
    for (const mod of effectMods) {
      if (typeof mod.flat === 'number') {
        breakdown.effectBonus += mod.flat;
      }
    }

    // ─────────────────────────────────────────────
    // 7. Combat state penalties/bonuses
    // ─────────────────────────────────────────────
    const stateMods = attacker.combatStates?.getAttackModifiers() || [];
    for (const mod of stateMods) {
      breakdown.stateBonus += mod.flat || 0;
    }

    // ─────────────────────────────────────────────
    // 8. Event hooks (feats, items, class abilities)
    // ─────────────────────────────────────────────
    const eventMods = attacker.emit?.('beforeAttackRoll', {
      attacker,
      target,
      weapon,
      breakdown
    }) || [];

    for (const mod of eventMods) {
      if (typeof mod.flat === 'number') {
        breakdown.miscBonus += mod.flat;
      }
    }

    // ─────────────────────────────────────────────
    // 9. Total attack roll
    // ─────────────────────────────────────────────
    const total =
      breakdown.baseRoll +
      breakdown.abilityMod +
      breakdown.weaponBonus +
      breakdown.traitBonus +
      breakdown.effectBonus +
      breakdown.stateBonus +
      breakdown.miscBonus;

    // ─────────────────────────────────────────────
    // 10. Critical threat detection
    // ─────────────────────────────────────────────
    const critRange = weapon?.getMeta('critRange') || 20;
    const isThreat = breakdown.baseRoll >= critRange;

    return {
      natural: breakdown.baseRoll,
      total,
      modifiers: breakdown,
      isThreat
    };
  },

  // ─────────────────────────────────────────────
  // CRITICAL CONFIRMATION
  // ─────────────────────────────────────────────
  confirm(attacker, target, weapon) {
    const roll = this.resolve(attacker, target, weapon);

    const ac = target.getAC ? target.getAC() : 10;
    const hit = roll.total >= ac;

    return {
      hit,
      roll
    };
  }
};

'use strict';

const D20Utils = require('../../../d20-core/d20/d20Utils');

/**
 * Ranged Attack Modifier Engine
 * ---------------------------------------------------------
 * Handles:
 *  - Range increments
 *  - Firing into melee
 *  - Point-Blank Shot
 *  - Cover
 *  - Concealment
 *  - Prone attacker / prone target
 *  - Effects
 *  - Traits
 */

class Ranged {

  /**
   * Build ranged attack modifiers.
   * @param {Character} attacker
   * @param {Character} target
   * @param {Item} weapon
   * @returns {Array} modifier objects
   */
  static getModifiers(attacker, target, weapon) {
    const mods = [];

    // ─────────────────────────────────────────────
    // 1. Distance & Range Increments
    // ─────────────────────────────────────────────
    const distance = attacker.room.getDistance(attacker, target);
    const increment = weapon.getMeta('rangeIncrement') || 20;

    if (distance > increment) {
      const increments = Math.floor(distance / increment);
      const penalty = -2 * increments;
      mods.push({ flat: penalty, reason: `range increment x${increments}` });
    }

    // ─────────────────────────────────────────────
    // 2. Firing into melee
    // ─────────────────────────────────────────────
    if (target.isInCombat() && !attacker.hasTrait('precise_shot')) {
      mods.push({ flat: -4, reason: 'firing into melee' });
    }

    // ─────────────────────────────────────────────
    // 3. Point-Blank Shot
    // ─────────────────────────────────────────────
    if (distance <= 30 && attacker.hasTrait('point_blank_shot')) {
      mods.push({ flat: +1, reason: 'point blank shot' });
    }

    // ─────────────────────────────────────────────
    // 4. Cover (soft, hard, total)
    // ─────────────────────────────────────────────
    const cover = attacker.room.getCover(attacker, target);
    if (cover === 'soft') mods.push({ flat: -2, reason: 'soft cover' });
    if (cover === 'hard') mods.push({ flat: -4, reason: 'hard cover' });
    if (cover === 'total') mods.push({ flat: -20, reason: 'total cover' });

    // ─────────────────────────────────────────────
    // 5. Concealment (miss chance handled elsewhere)
    // ─────────────────────────────────────────────
    const conceal = attacker.room.getConcealment(attacker, target);
    if (conceal === 'partial') mods.push({ flat: -2, reason: 'partial concealment' });
    if (conceal === 'full') mods.push({ flat: -5, reason: 'full concealment' });

    // ─────────────────────────────────────────────
    // 6. Prone attacker / prone target
    // ─────────────────────────────────────────────
    if (attacker.combatStates?.isProne()) {
      mods.push({ flat: -4, reason: 'attacker prone' });
    }

    if (target.combatStates?.isProne()) {
      mods.push({ flat: +4, reason: 'target prone (ranged)' });
    }

    // ─────────────────────────────────────────────
    // 7. Effects (buffs/debuffs)
    // ─────────────────────────────────────────────
    const effectMods = attacker.getEffectModifiers?.('ranged_attack') || [];
    for (const mod of effectMods) {
      if (typeof mod.flat === 'number') {
        mods.push({ flat: mod.flat, reason: mod.reason || 'effect' });
      }
    }

    // ─────────────────────────────────────────────
    // 8. Event hooks (feats, items, class abilities)
    // ─────────────────────────────────────────────
    const eventMods = attacker.emit?.('beforeRangedAttack', {
      attacker,
      target,
      weapon
    }) || [];

    for (const mod of eventMods) {
      if (typeof mod.flat === 'number') {
        mods.push(mod);
      }
    }

    return mods;
  }
}

module.exports = Ranged;

'use strict';

const D20Utils = require('../../../d20-core/d20/d20Utils');

/**
 * Mounted Combat Engine
 * ---------------------------------------------------------
 * Handles:
 *  - Higher ground bonus
 *  - Mounted Combat feat (negate hit on mount)
 *  - Ride checks
 *  - Mounted charge
 *  - Spirited Charge
 *  - Trample
 *  - Cover from mount
 */

class Mounted {

  /**
   * +1 attack bonus for being mounted vs unmounted targets.
   */
  static getHigherGroundBonus(attacker, target) {
    if (!attacker.hasTrait('mounted')) return 0;
    if (target.hasTrait('mounted')) return 0;
    return 1;
  }

  /**
   * Mounted Combat feat: negate hit on mount with a Ride check.
   */
  static attemptNegateHit(attacker, mount, attackRoll) {
    if (!attacker.hasTrait('mounted_combat')) return false;

    const rideSkill = attacker.getSkill('ride') || 0;
    const dc = attackRoll.total;

    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + rideSkill;

    return total >= dc;
  }

  /**
   * Mounted Charge: +2 attack, +2 damage (base), doubled with Spirited Charge.
   */
  static getChargeModifiers(attacker) {
    if (!attacker.hasTrait('mounted')) return [];

    const mods = [];

    // Base mounted charge
    mods.push({ flat: +2, reason: 'mounted charge' });

    // Spirited Charge doubles damage
    if (attacker.hasTrait('spirited_charge')) {
      mods.push({ damageMultiplier: 2, reason: 'spirited charge' });
    } else {
      mods.push({ flatDamage: +2, reason: 'mounted charge' });
    }

    return mods;
  }

  /**
   * Trample: mount makes an overrun attempt.
   */
  static canTrample(attacker) {
    return attacker.hasTrait('trample');
  }

  /**
   * Cover from mount: +2 AC vs ranged attacks.
   */
  static getCoverBonus(attacker) {
    if (!attacker.hasTrait('mounted')) return 0;
    return 2;
  }
}

module.exports = Mounted;

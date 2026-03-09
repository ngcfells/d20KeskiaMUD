'use strict';

const D20Utils = require('../d20/d20Utils');
const Critical = require('./critical');
const Defense = require('./defense');
const TwoWeapon = require('./two-weapon');
const Deflect = require('./deflect');

module.exports = {
  /**
   * Execute an attack roll.
   * @param {Character} attacker
   * @param {Character} target
   * @param {Object} options { isRanged, isOffhand }
   */
  resolve(attacker, target, options = {}) {
    const roll = Math.floor(Math.random() * 20) + 1;
    const bab = attacker.getMeta('baseAttackBonus') || 0;
    const targetAC = Defense.getAC(target);

    // 1. Handle Automatic Fail (Natural 1)
    if (roll === 1) {
      return { hit: false, crit: false, total: 1, natural: 1 };
    }

    // 2. Determine Ability Modifier (Str vs Dex for Finesse/Ranged)
    let abilityStat = options.isRanged ? 'dexterity' : 'strength';
    if (!options.isRanged && attacker.hasFeat('weapon_finesse')) {
      const str = attacker.getAttribute('strength') || 10;
      const dex = attacker.getAttribute('dexterity') || 10;
      if (dex > str) abilityStat = 'dexterity';
    }

    const mod = D20Utils.getModifier(attacker.getAttribute(abilityStat));

    // 3. Handle Penalties (Two-Weapon Fighting, etc.)
    let totalPenalty = 0;
    if (attacker.equipment.has('offhand')) {
      const penalties = TwoWeapon.getPenalties(attacker);
      totalPenalty += options.isOffhand ? penalties.offhand : penalties.primary;
    }

    // 4. Calculate Final Total
    const total = roll + bab + mod + totalPenalty;

    // 5. Resolve Hit Success (Standard D20: Natural 20 always hits)
    let isHit = total >= targetAC || roll === 20;

    // 6. DEFLECTION CHECK (Jedi/Monk)
    // Only happens on a successful Ranged Hit
    if (isHit && options.isRanged) {
      const weapon = attacker.equipment.get('mainhand');
      const dmgType = weapon ? (weapon.getMeta('damageType') || 'physical') : 'physical';

      // We call the unified Deflect logic
      if (Deflect.resolve(target, total, dmgType)) {
        attacker.say(`<cyan>${target.name} negated your shot!</cyan>`);
        return { hit: false, deflected: true, total, natural: roll };
      }
    }

    // 7. Resolve Critical Threat
    let isCrit = false;
    if (isHit) {
      const isThreat = Critical.isThreat(attacker, roll);
      if (isThreat) {
        // Confirmation roll: Re-roll against AC to confirm the crit
        isCrit = Critical.confirm(attacker, target, this);
      }
    }

    return {
      hit: isHit,
      total,
      crit: isCrit,
      natural: roll,
      isOffhand: options.isOffhand || false
    };
  }
};

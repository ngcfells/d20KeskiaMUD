'use strict';

const D20Utils = require('../d20/d20Utils');
const DamageTypes = require('./damage-types');

module.exports = {
  /**
   * Resolve a deflection attempt.
   * @param {Character} defender The Monk or Jedi
   * @param {number} attackTotal The total 1d20 + Mods from the attacker
   * @param {string} dmgType The type of damage being dealt (from damage.js)
   */
  resolve(defender, attackTotal, dmgType) {
    const isEnergy = [DamageTypes.ENERGY, DamageTypes.FIRE].includes(dmgType);
    const isPhysical = [DamageTypes.PHYSICAL, DamageTypes.KINETIC].includes(dmgType);

    // --- 1. JEDI DEFLECT (Energy/Blasters) ---
    if (isEnergy && defender.hasAbility('deflect')) {
      const weapon = defender.equipment.get('mainhand');
      if (weapon && weapon.getMeta('isLightsaber')) {
        return this._executeRoll(defender, attackTotal, "Your blade hums as you deflect the bolt!");
      }
    }

    // --- 2. MONK DEFLECT (Physical/Arrows) ---
    if (isPhysical && defender.hasFeat('deflect_arrows')) {
      // D20 Rule: Must have at least one hand free
      const offhand = defender.equipment.get('offhand');
      if (!offhand) {
        return this._executeRoll(defender, attackTotal, "You snatch the projectile out of the air!");
      }
    }

    return false;
  },

  /**
   * Internal d20 Check: 1d20 + BAB + Dex Mod
   */
  _executeRoll(defender, attackTotal, successMessage) {
    const roll = Math.floor(Math.random() * 20) + 1;
    const bab = defender.getMeta('baseAttackBonus') || 0;
    const dexMod = D20Utils.getModifier(defender.getAttribute('dexterity') || 10);
    
    const total = roll + bab + dexMod;
    const success = total >= attackTotal;

    if (success) {
      defender.say(`<cyan>${successMessage}</cyan>`);
    }

    return success;
  }
};

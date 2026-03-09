'use strict';

const D20Utils = require('../../../d20-core/d20/d20Utils');

/**
 * Deflection Engine (Core)
 * ---------------------------------------------------------
 * This file contains ONLY the universal deflection mechanic.
 *
 * All class-specific or setting-specific deflection abilities
 * (Monk, Jedi, Psionic, Tech, Magic, etc.)
 * MUST be implemented as TRAITS in their respective bundles.
 *
 * Core combat NEVER checks:
 *  - class
 *  - feats
 *  - abilities
 *  - race
 *  - specific weapons (lightsabers, etc.)
 *
 * It ONLY checks for traits in the "deflect" family.
 */

class Deflect {

  /**
   * Attempt to deflect an incoming attack.
   * @param {Character} defender
   * @param {number} attackTotal
   * @param {string} dmgType
   * @returns {object|false}
   */
  static resolve(defender, attackTotal, dmgType) {

    // Cannot deflect while incapacitated
    if (defender.combatStates?.isStunned()) return false;
    if (defender.combatStates?.isFlatFooted()) return false;

    // Get all deflection traits
    const deflectTraits = defender.getTraitsByFamily?.('deflect') || [];
    if (deflectTraits.length === 0) return false;

    // Each trait defines:
    //  - allowedDamageTypes
    //  - requiresFreeHand
    //  - requiresWeaponTag
    //  - ability (dex/wis/cha/etc.)
    //  - successMessage
    //  - effect hooks (optional)
    for (const trait of deflectTraits) {
      const state = trait.state;
      if (!state) continue;

      // Check damage type
      if (state.allowedDamageTypes &&
          !state.allowedDamageTypes.includes(dmgType)) {
        continue;
      }

      // Check free hand requirement
      if (state.requiresFreeHand) {
        const offhand = defender.equipment.get('offhand');
        if (offhand) continue;
      }

      // Check weapon tag requirement (e.g., "isDeflectionTool")
      if (state.requiresWeaponTag) {
        const weapon = defender.getEquippedWeapon?.();
        if (!weapon || !weapon.getMeta(state.requiresWeaponTag)) continue;
      }

      // Execute deflection roll
      const roll = Math.floor(Math.random() * 20) + 1;

      const bab = defender.getMeta('baseAttackBonus') || 0;

      const abilityScore =
        defender.getAttribute(state.ability || 'dexterity') || 10;

      const abilityMod = D20Utils.getModifier(abilityScore);

      const total = roll + bab + abilityMod;
      const success = total >= attackTotal;

      if (success) {
        if (state.successMessage) {
          defender.say(`<cyan>${state.successMessage}</cyan>`);
        }

        return {
          success: true,
          roll,
          total,
          trait: trait.id,
          cancelDamage: true
        };
      }
    }

    return false;
  }
}

module.exports = Deflect;

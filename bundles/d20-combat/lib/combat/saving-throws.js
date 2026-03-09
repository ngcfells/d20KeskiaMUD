'use strict';

const D20Utils = require('../../../d20-core/d20/d20Utils');

/**
 * Saving Throw Engine
 * ---------------------------------------------------------
 * Handles:
 *  - Fortitude, Reflex, Will
 *  - Natural 1/20 auto fail/success
 *  - Attribute modifiers
 *  - Trait bonuses (Iron Will, Lightning Reflexes, etc.)
 *  - Effect bonuses (buffs/debuffs)
 *  - Condition penalties (shaken, sickened, frightened)
 *  - Class features (Divine Grace, etc.)
 *  - Item bonuses (resistance bonuses)
 *  - Combat state modifiers
 */

class SavingThrows {

  /**
   * Perform a saving throw.
   * @param {Character} character
   * @param {string} type 'fortitude' | 'reflex' | 'will'
   * @param {number} dc
   */
  static check(character, type, dc) {
    const roll = Math.floor(Math.random() * 20) + 1;

    // ─────────────────────────────────────────────
    // 1. Natural 1 / Natural 20
    // ─────────────────────────────────────────────
    if (roll === 1) {
      return { success: false, roll, total: roll, auto: 'fail', dc };
    }

    if (roll === 20) {
      return { success: true, roll, total: roll + 99, auto: 'success', dc };
    }

    // ─────────────────────────────────────────────
    // 2. Base save from attributes (your system)
    // fortitude = attribute 'fortitude'
    // reflex    = attribute 'reflex'
    // will      = attribute 'will'
    // ─────────────────────────────────────────────
    const base = character.getAttribute(type) || 0;

    // ─────────────────────────────────────────────
    // 3. Ability modifier
    // ─────────────────────────────────────────────
    const abilityMap = {
      fortitude: 'constitution',
      reflex: 'dexterity',
      will: 'wisdom'
    };

    const ability = abilityMap[type];
    const abilityScore = character.getAttribute(ability) || 10;
    const abilityMod = D20Utils.getModifier(abilityScore);

    // ─────────────────────────────────────────────
    // 4. Trait bonuses (Iron Will, Lightning Reflexes, etc.)
    // ─────────────────────────────────────────────
    let traitBonus = 0;
    if (character.hasTrait(`improved_${type}`)) traitBonus += 2;
    if (character.hasTrait(`greater_${type}`)) traitBonus += 2;

    // ─────────────────────────────────────────────
    // 5. Effect bonuses (buffs/debuffs)
    // ─────────────────────────────────────────────
    const effectMods = character.getEffectModifiers?.(`save_${type}`) || [];
    const effectBonus = effectMods.reduce((sum, m) => sum + (m.flat || 0), 0);

    // ─────────────────────────────────────────────
    // 6. Condition penalties (shaken, sickened, frightened)
    // ─────────────────────────────────────────────
    const stateMods = character.combatStates?.getDefenseModifiers() || [];
    const stateBonus = stateMods.reduce((sum, m) => sum + (m.flat || 0), 0);

    // ─────────────────────────────────────────────
    // 7. Class features (Divine Grace, etc.)
    // ─────────────────────────────────────────────
    let classBonus = 0;
    if (character.hasTrait('divine_grace') && !character.hasTrait('fallen_paladin')) {
      const chaScore = character.getAttribute('charisma') || 10;
      classBonus += Math.max(0, D20Utils.getModifier(chaScore));
    }

    // ─────────────────────────────────────────────
    // 8. Item bonuses (resistance bonuses)
    // ─────────────────────────────────────────────
    const itemBonus = character.getAttribute(`save_${type}_bonus`) || 0;

    // ─────────────────────────────────────────────
    // 9. Total
    // ─────────────────────────────────────────────
    const total =
      roll +
      base +
      abilityMod +
      traitBonus +
      effectBonus +
      stateBonus +
      classBonus +
      itemBonus;

    const success = total >= dc;

    return {
      success,
      roll,
      total,
      dc,
      breakdown: {
        base,
        abilityMod,
        traitBonus,
        effectBonus,
        stateBonus,
        classBonus,
        itemBonus
      }
    };
  }
}

module.exports = SavingThrows;

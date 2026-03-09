'use strict';

const D20Utils = require('../../../d20-core/d20/d20Utils');

/**
 * Defense Engine
 * ---------------------------------------------------------
 * Computes:
 *  - AC (normal)
 *  - Touch AC
 *  - Flat-footed AC
 *  - Armor layers (kinetic, ballistic, energy)
 *  - Trait bonuses
 *  - Effect bonuses
 *  - Combat state penalties
 */

module.exports = {
  /**
   * Get full AC breakdown for a character.
   * @param {Character} character
   * @returns {object} { total, touch, flatFooted, breakdown }
   */
  getAC(character) {
    const breakdown = {
      base: 10,
      dex: 0,
      size: 0,
      armor: 0,
      shield: 0,
      natural: 0,
      deflection: 0,
      dodge: 0,
      traitBonus: 0,
      effectBonus: 0,
      stateBonus: 0,
      miscBonus: 0
    };

    // Ensure combat states exist
    character.combatStates = character.combatStates || new (require('../combat/combat-states'))(character);

    // ─────────────────────────────────────────────
    // 1. Dexterity modifier (unless flat-footed)
    // ─────────────────────────────────────────────
    const dexMod = D20Utils.getModifier(character.getAttribute('dexterity') || 10);

    if (!character.combatStates.isFlatFooted()) {
      breakdown.dex = dexMod;
    }

    // ─────────────────────────────────────────────
    // 2. Armor bonus (body slot)
    // ─────────────────────────────────────────────
    const armor = character.getEquippedArmor?.();
    if (armor) {
      breakdown.armor += armor.getMeta('armorBonus') || 0;
      breakdown.natural += armor.getMeta('naturalArmor') || 0;
    }

    // ─────────────────────────────────────────────
    // 3. Shield bonus (offhand or held)
    // ─────────────────────────────────────────────
    const shield = character.getEquippedShield?.();
    if (shield) {
      breakdown.shield += shield.getMeta('shieldBonus') || 0;
    }

    // ─────────────────────────────────────────────
    // 4. Natural armor (racial or item)
    // ─────────────────────────────────────────────
    breakdown.natural += character.getAttribute('natural_armor') || 0;

    // ─────────────────────────────────────────────
    // 5. Deflection bonuses (rings, spells, effects)
    // ─────────────────────────────────────────────
    breakdown.deflection += character.getAttribute('ac_deflection') || 0;

    // ─────────────────────────────────────────────
    // 6. Dodge bonuses (stacking)
    // ─────────────────────────────────────────────
    breakdown.dodge += character.getAttribute('ac_dodge') || 0;

    // ─────────────────────────────────────────────
    // 7. Trait bonuses
    // ─────────────────────────────────────────────
    if (character.hasTrait('uncanny_dodge')) {
      breakdown.traitBonus += 1;
    }

    if (character.hasTrait('combat_reflexes')) {
      breakdown.traitBonus += 1;
    }

    // ─────────────────────────────────────────────
    // 8. Effect bonuses
    // ─────────────────────────────────────────────
    const effectMods = character.getEffectModifiers?.('ac') || [];
    for (const mod of effectMods) {
      if (typeof mod.flat === 'number') {
        breakdown.effectBonus += mod.flat;
      }
    }

    // ─────────────────────────────────────────────
    // 9. Combat state modifiers
    // ─────────────────────────────────────────────
    const stateMods = character.combatStates.getDefenseModifiers() || [];
    for (const mod of stateMods) {
      breakdown.stateBonus += mod.flat || 0;
    }

    // ─────────────────────────────────────────────
    // 10. Event hooks (feats, items, class abilities)
    // ─────────────────────────────────────────────
    const eventMods = character.emit?.('beforeDefenseCalc', {
      character,
      breakdown
    }) || [];

    for (const mod of eventMods) {
      if (typeof mod.flat === 'number') {
        breakdown.miscBonus += mod.flat;
      }
    }

    // ─────────────────────────────────────────────
    // 11. Final AC values
    // ─────────────────────────────────────────────
    const total =
      breakdown.base +
      breakdown.dex +
      breakdown.size +
      breakdown.armor +
      breakdown.shield +
      breakdown.natural +
      breakdown.deflection +
      breakdown.dodge +
      breakdown.traitBonus +
      breakdown.effectBonus +
      breakdown.stateBonus +
      breakdown.miscBonus;

    // Touch AC ignores armor, natural armor, shield
    const touch =
      breakdown.base +
      breakdown.dex +
      breakdown.size +
      breakdown.deflection +
      breakdown.dodge +
      breakdown.traitBonus +
      breakdown.effectBonus +
      breakdown.stateBonus +
      breakdown.miscBonus;

    // Flat-footed AC ignores dex and dodge
    const flatFooted =
      breakdown.base +
      breakdown.size +
      breakdown.armor +
      breakdown.shield +
      breakdown.natural +
      breakdown.deflection +
      breakdown.traitBonus +
      breakdown.effectBonus +
      breakdown.stateBonus +
      breakdown.miscBonus;

    return {
      total,
      touch,
      flatFooted,
      breakdown
    };
  }
};

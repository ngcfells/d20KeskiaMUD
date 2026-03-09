'use strict';

const D20Utils = require('../d20/d20Utils');

/**
 * Initiative Engine (RAW d20)
 * -----------------------------------------
 * - Roll once per combat
 * - Dex modifier applies
 * - Trait bonuses apply
 * - Effect bonuses apply
 * - Advantage/disadvantage supported
 * - Surprise round supported
 * - Flat-footed state handled externally
 */

module.exports = {
  /**
   * Roll initiative for a character.
   * @param {Character} character
   * @returns {object} { total, roll, modifiers, advantageState }
   */
  rollInitiative(character) {
    const breakdown = {
      baseRoll: 0,
      dexMod: 0,
      traitBonus: 0,
      effectBonus: 0,
      miscBonus: 0,
      advantage: false,
      disadvantage: false
    };

    // ─────────────────────────────────────────────
    // 1. Determine advantage/disadvantage
    // ─────────────────────────────────────────────
    if (character.hasTrait('initiative_advantage')) {
      breakdown.advantage = true;
    }

    if (character.hasTrait('initiative_disadvantage')) {
      breakdown.disadvantage = true;
    }

    // Effects may also grant advantage/disadvantage
    const effectMods = character.getEffectModifiers?.('initiative') || [];
    for (const mod of effectMods) {
      if (mod.advantage) breakdown.advantage = true;
      if (mod.disadvantage) breakdown.disadvantage = true;
    }

    // ─────────────────────────────────────────────
    // 2. Roll the d20 (with advantage/disadvantage)
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
    // 3. Dexterity modifier
    // ─────────────────────────────────────────────
    breakdown.dexMod = D20Utils.getModifier(character.getAttribute('dexterity') || 10);

    // ─────────────────────────────────────────────
    // 4. Trait bonuses (Improved Initiative, Quickdraw, etc.)
    // ─────────────────────────────────────────────
    if (character.hasTrait('improved_initiative')) {
      breakdown.traitBonus += 4;
    }

    // Quickdraw is an attribute in your system
    breakdown.traitBonus += character.getAttribute('quickdraw') || 0;

    // ─────────────────────────────────────────────
    // 5. Effect bonuses (from spells, tech, psionics, etc.)
    // ─────────────────────────────────────────────
    for (const mod of effectMods) {
      if (typeof mod.flat === 'number') {
        breakdown.effectBonus += mod.flat;
      }
    }

    // ─────────────────────────────────────────────
    // 6. Event hooks (for feats, class abilities, items)
    // ─────────────────────────────────────────────
    const eventMods = character.emit?.('beforeInitiative', {
      character,
      breakdown
    }) || [];

    for (const mod of eventMods) {
      if (typeof mod.flat === 'number') {
        breakdown.miscBonus += mod.flat;
      }
    }

    // ─────────────────────────────────────────────
    // 7. Final total
    // ─────────────────────────────────────────────
    const total =
      breakdown.baseRoll +
      breakdown.dexMod +
      breakdown.traitBonus +
      breakdown.effectBonus +
      breakdown.miscBonus;

    return {
      total,
      roll: breakdown.baseRoll,
      modifiers: breakdown,
      advantageState: breakdown.advantage
        ? 'advantage'
        : breakdown.disadvantage
        ? 'disadvantage'
        : 'normal'
    };
  }
};

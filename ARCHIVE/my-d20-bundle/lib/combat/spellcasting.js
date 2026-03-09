/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/combat/spellcasting.js
 * PURPOSE: Full spellcasting engine integrating Concentration,
 *          Saving Throws, Spell Resistance, and Spell Effects.
 */

'use strict';

const D20Utils = require('../d20/d20Utils');

module.exports = {
  /**
   * Main entry point for casting a spell.
   * Called by the `cast` command.
   */
  castSpell(state, caster, target, spell) {
    const spellLevel = spell.level || 0;

    // 1) Verify caster knows the spell
    const known = caster.getMeta('spells') || [];
    if (!known.includes(spell.id)) {
      return caster.say("You have not learned that spell.");
    }

    // 2) Verify spell slots
    if (!this._consumeSpellSlot(caster, spellLevel)) {
      return caster.say("You have no remaining spell slots of that level.");
    }

    // 3) Verbal component language check
    if (spell.verbalRequired && spell.verbalLanguageId && state.LanguageManager) {
      if (!state.LanguageManager.isFluent(caster, spell.verbalLanguageId)) {
        caster.say('You cannot correctly pronounce the verbal components; you do not speak the required language.');
        return;
      }
    }

    // 4) Concentration check (if needed)
    if (spell.requiresConcentration) {
      const dc = 10 + spellLevel; // baseline
      const result = this.checkConcentration(state, caster, dc);

      if (!result.success) {
        caster.say(`<red>Your concentration falters!</red>`);
        return;
      }
    }

    // 5) Spell Resistance
    if (spell.spellResistance && !this.checkSR(caster, target)) {
      return; // SR message already printed
    }

    // 6) Saving Throw
    let savePassed = false;
    if (spell.save) {
      const dc = this.calculateSpellDC(caster, spellLevel);
      savePassed = this._savingThrow(state, target, spell.save, dc);
    }

    // 7) Apply spell effect
    if (spell.onCast) {
      spell.onCast(state, caster, target, { savePassed });
    }

    caster.say(`<yellow>You cast ${spell.name}!</yellow>`);
  },

  checkConcentration(state, caster, dc) {
    const ranks = state.SkillManager.getRanks(caster, 'concentration');
    const conScore = caster.getAttribute('constitution') || 10;
    const conMod = D20Utils.getModifier(conScore);
    const roll = Math.floor(Math.random() * 20) + 1;

    const total = roll + ranks + conMod;

    return { success: total >= dc, roll, total, dc };
  },

  getCasterLevel(caster) {
    return caster.getMeta('level') || 1;
  },

  checkSR(caster, target) {
    const sr = target.getMeta('spell_resistance') || 0;
    if (sr === 0) return true;

    const roll = Math.floor(Math.random() * 20) + 1;
    const cl = this.getCasterLevel(caster);
    const total = roll + cl;

    if (total < sr) {
      caster.say(`<cyan>${target.name}'s Spell Resistance shrugs off your magic!</cyan>`);
      return false;
    }

    return true;
  },

  calculateSpellDC(caster, spellLevel) {
    const ability = caster.getMeta('spellcastingAbility') || 'intelligence';
    const score = caster.getAttribute(ability) || 10;
    const mod = D20Utils.getModifier(score);

    return 10 + spellLevel + mod;
  },

  _savingThrow(state, target, saveType, dc) {
    const saveScore = target.getMeta(`save_${saveType}`) || 0;
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + saveScore;

    return total >= dc;
  },

  _consumeSpellSlot(caster, level) {
    const slots = caster.getMeta('spellSlots') || {};
    const table = slots[caster.level] || {};

    if (!table[level] || table[level] <= 0) return false;

    table[level] -= 1;
    slots[caster.level] = table;
    caster.setMeta('spellSlots', slots);

    return true;
  }
};

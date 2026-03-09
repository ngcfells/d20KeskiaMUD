'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Coats animated undead in a shroud of Acid, Cold, Electricity, Fire, or Sonic energy.
 * Grants +2 Turn Resistance, +2 Natural Armor, and 1d6 elemental damage on hit/touch.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'elemental_shroud',
  name: 'Elemental Shroud',
  level: 5,
  school: 'necromancy',
  subschool: null,
  descriptors: ['varies'], // Determined by the energy type chosen
  source: 'Dread Codex | OGL',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 5
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'medium',
  target: 'up to one animate dead creature/level',
  area: null,
  duration: 'permanent',
  savingThrow: 'none',
  spellResistance: false,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const energyTypes = ['acid', 'cold', 'electricity', 'fire', 'sonic'];
    const chosenType = (ctx.args && energyTypes.includes(ctx.args.toLowerCase())) 
      ? ctx.args.toLowerCase() 
      : 'fire'; // Default to Fire

    // Target Validation: Must be Undead and specifically 'animated' (controlled)
    const targets = Array.isArray(ctx.targets) ? ctx.targets : [target];
    const limit = caster.level;

    targets.slice(0, limit).forEach(undead => {
      if (undead.getMeta('race_type') !== 'undead') return;

      // Enforcement: Only one shroud at a time
      if (undead.effects.has('elemental_shroud_active')) {
        undead.removeEffect('elemental_shroud_active');
      }

      const effect = state.EffectFactory.create('elemental_shroud_active', undead, {
        state: { energyType: chosenType }
      });

      undead.addEffect(effect);
      caster.say(`<magenta>You weave a shroud of ${chosenType} around ${undead.name}.</magenta>`);
    });
  }
};

'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Target familiar gains a +2 enhancement bonus to Str, Dex, and Con,
 * and effectively gains +1 Hit Die (including associated HP/saves).
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'augment_familiar',
  name: 'Augment Familiar',
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'Standard',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
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
  range: 'touch',
  target: 'one familiar',
  area: null,
  duration: '1 min/level',
  savingThrow: 'will',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // Validation: Target must be the caster's familiar
    if (!target.isFamiliarOf || !target.isFamiliarOf(caster)) {
      return caster.say("<yellow>This spell can only be cast upon your own familiar.</yellow>");
    }

    caster.say(`<cyan>You reach out and touch ${target.name}, channeling transmutative energy into its small frame.</cyan>`);
    
    const effect = state.EffectFactory.create('augment_familiar_active', target, {
      duration: (1 * 60000) * caster.level, // 1 min per level
      state: { casterId: caster.id }
    });

    target.addEffect(effect);
  }
};

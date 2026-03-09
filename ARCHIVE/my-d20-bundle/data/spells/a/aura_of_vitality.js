'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * All allies within 30 ft. of the caster gain a +4 morale bonus to 
 * Strength, Dexterity, and Constitution.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'aura_of_vitality',
  name: 'Aura of Vitality',
  level: 7,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'Standard',

  /**
   * SPELL LISTS:
   * - Druid: 7
   * - Cleric: 7 (Life/Strength Domains)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: '30 ft.',
  target: 'self',
  area: '30-ft.-radius emanation centered on caster',
  duration: '1 round/level',
  savingThrow: 'will-negates (harmless)',
  spellResistance: true, // (harmless)

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
    caster.room.broadcast(`<yellow>A pulse of golden light radiates from ${caster.name}, invigorating everyone nearby!</yellow>`);

    const effect = state.EffectFactory.create('aura_of_vitality_active', caster, {
      duration: (1 * 6000) * caster.level, // 1 round per level
      state: { radius: 30 }
    });

    caster.addEffect(effect);
  }
};

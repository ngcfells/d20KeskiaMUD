'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Centered on the caster. Allies within 10 ft gain a +4 sacred bonus on 
 * Reflex saves against area effects and the Evasion ability.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'aura_of_evasion',
  name: 'Aura of Evasion',
  level: 5,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'Standard',

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { id: 'powdered_emerald', quantity: 1, minValue: 500, consumed: true }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: '10 ft.',
  target: 'allies in area',
  area: '10-ft.-radius emanation centered on caster',
  duration: '1 min/level',
  savingThrow: 'will', // Will negates (harmless)
  spellResistance: true, // Yes (harmless)

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
    caster.say("<cyan>A shimmering, emerald-tinted field erupts from you, weaving a web of reactive protection around your allies.</cyan>");

    const effect = state.EffectFactory.create('aura_of_evasion_active', caster, {
      duration: (1 * 60000) * caster.level,
      state: {
        radius: 10,
        bonusValue: 4,
        bonusType: 'sacred'
      }
    });

    caster.addEffect(effect);
  }
};

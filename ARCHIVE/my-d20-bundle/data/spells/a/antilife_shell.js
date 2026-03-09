/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Creates an invisible hemispherical energy field that prevents the 
 * entrance of most living creatures. 
 */
const DamageTypes = require('../../lib/combat/damage-types');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'antilife_shell',
  name: 'Antilife Shell',
  level: 6,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'PHB | p. 199',

  /**
   * SPELL LISTS:
   * - Cleric: 6
   * - Druid: 6
   * - Animal Domain: 6
   * - Renewal Domain: 6
   * - Rarity: Rare
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'DF'], // Divine Focus required
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  area: '10-ft. radius emanation centered on you',
  duration: '10 min./level',
  savingThrow: 'none',
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
    const durationMin = 10 * (caster.getMeta('level') || 1);
    const durationMs = durationMin * 60 * 1000;

    // Persist the effect
    const effect = state.EffectFactory.create('antilife_shell_effect', {
      config: { 
        name: "Antilife Shell",
        duration: durationMs 
      },
      state: {
        radius: 10,
        casterId: caster.id
      }
    });

    caster.addEffect(effect);
  }
};

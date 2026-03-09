'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Provides protection against the natural environmental traits of a plane,
 * including extreme temperatures, lack of air, and poisonous fumes.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'avoid_planar_effects',
  name: 'Avoid Planar Effects',
  level: 2,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'Standard',

  /**
   * SPELL LISTS:
   * - Cleric: 2
   * - Druid: 2
   * - Sorcerer/Wizard: 2
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V'], // Verbal only
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one creature/level touched',
  area: null,
  duration: '1 minute/level',
  savingThrow: 'fortitude (harmless)',
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
    // Determine the current plane from room metadata
    const currentPlane = caster.room.getMeta('plane_id') || 'Material';
    
    caster.say(`<cyan>You speak a word of grounding power, shielding your party from the hostile nature of ${currentPlane}.</cyan>`);

    // Handle multiple targets if provided, up to caster level
    const targets = Array.isArray(ctx.targets) ? ctx.targets : [target];
    const limit = Math.max(1, caster.level);

    targets.slice(0, limit).forEach(t => {
      const effect = state.EffectFactory.create('avoid_planar_effects_active', t, {
        duration: (1 * 60000) * caster.level,
        state: { planeId: currentPlane }
      });
      t.addEffect(effect);
    });
  }
};

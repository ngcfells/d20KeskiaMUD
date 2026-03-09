// path: bundles/my-d20-bundle/spells/light.js
'use strict';

/**
 * Spell: Light
 * Level: 0 (Orison / Cantrip)
 * School: Evocation [Light]
 *
 * Creates a magical light source on a touched object or creature.
 * Interacts with rooms that check for 'light_spell' effects.
 */

module.exports = {

  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────

  id: 'light',
  name: 'Light',
  level: 0,
  school: 'evocation',
  subschool: null,
  descriptors: ['light'],
  source: 'SRD',

  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────

  castingTime: 'standard',
  components: ['V', 'S'], // Verbal + Somatic
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────

  range: 'touch',
  target: 'object or creature',
  area: null,
  duration: '10 min/level',
  savingThrow: 'none',
  spellResistance: false,

  // ─────────────────────────────────────────────────────────────
  //  ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────

  /**
   * onCast(state, caster, target, ctx)
   * ctx.savePassed — always true (no save)
   */
  onCast(state, caster, target, ctx) {
    // Determine the actual target:
    // If the caster didn't specify a target, default to caster.
    const actualTarget = target || caster;

    caster.say("<yellow>You touch the target, and a soft white radiance blossoms outward.</yellow>");

    // Apply the Light Spell effect
    if (state.EffectFactory.has('light_spell')) {
      const effect = state.EffectFactory.create('light_spell', {
        duration: this._parseDuration(this.duration, caster)
      });
      actualTarget.addEffect(effect);
    }

    return true;
  },

  /**
   * onTick — Light has no periodic tick behavior.
   */
  onTick(state, caster, effect) {},

  /**
   * onEnd — Called when the effect expires or is dismissed.
   */
  onEnd(state, caster, effect) {
    const target = effect.target;
    if (target) {
      target.say("<white>The magical light fades away.</white>");
    }
  },

  // ─────────────────────────────────────────────────────────────
  //  INTERNAL UTILITY
  // ─────────────────────────────────────────────────────────────

  /**
   * Converts duration strings like "10 min/level" into milliseconds.
   * Your duration engine may already handle this; if so, replace this
   * with a call to your canonical parser.
   */
  _parseDuration(durationStr, caster) {
    // Simple parser for "10 min/level"
    if (durationStr.includes('min/level')) {
      const minutes = parseInt(durationStr.split(' ')[0], 10);
      const level = caster.getMeta('level') || 1;
      return minutes * level * 60000;
    }

    // Fallback: 10 minutes
    return 600000;
  }
};

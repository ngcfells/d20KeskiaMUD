'use strict';

/**
 * Generic polymorph effect.
 * Stores original stats and applies polymorph metadata.
 * Actual stat changes are handled by your combat/stat engine
 * reading the polymorph_* metas.
 */

module.exports = {
  config: {
    name: 'Polymorph',
    description: 'You are transformed into another creature.',
    type: 'polymorph',
    duration: null
  },

  state: {
    original: null,
    form: null,
    bonuses: null,
    size: null,
    category: null,
    tier: 0
  },

  /**
   * Called when the effect is applied.
   */
  apply(effect, caster) {
    const data = effect.config;

    // Store original metadata
    effect.state.original = {
      size: caster.getMeta('size'),
      polymorphActive: caster.getMeta('polymorphActive'),
      bonuses: caster.getMeta('polymorphBonuses'),
      form: caster.getMeta('polymorphForm'),
      category: caster.getMeta('polymorphCategory'),
      tier: caster.getMeta('polymorphTier')
    };

    // Apply new metadata
    caster.setMeta('polymorphActive', true);
    caster.setMeta('polymorphForm', data.form);
    caster.setMeta('polymorphCategory', data.category);
    caster.setMeta('polymorphTier', data.tier);
    caster.setMeta('polymorphSize', data.size);
    caster.setMeta('polymorphBonuses', data.bonuses);
  },

  /**
   * Called when the effect ends.
   */
  remove(effect, caster) {
    const orig = effect.state.original;

    caster.setMeta('polymorphActive', orig.polymorphActive);
    caster.setMeta('polymorphForm', orig.form);
    caster.setMeta('polymorphCategory', orig.category);
    caster.setMeta('polymorphTier', orig.tier);
    caster.setMeta('polymorphSize', orig.size);
    caster.setMeta('polymorphBonuses', orig.bonuses);
  }
};

'use strict';

/**
 * Polymorph subsystem.
 * Spells call startPolymorph() with a config object.
 */

module.exports = {
  startPolymorph(state, caster, effectId, config) {
    caster.addEffect(effectId, {
      form: config.formName,
      category: config.formCategory,
      tier: config.tier,
      size: config.size,
      bonuses: config.bonuses
    });
  },

  endPolymorph(state, caster, effectId) {
    caster.removeEffect(effectId);
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Force-Attuned",
    description: "A physiology partially sustained by the Force.",
    type: "trait",
    family: "physiology_force_attuned",
    unique: true,
    persists: true
  },

  state: {
    forceRegenBonus: +3,
    stabilityBonus: +2,
    vitalityBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.forceRegen === "number") r.forceRegen = current.forceRegen + state.forceRegenBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      if (typeof current.vitality === "number") r.vitality = current.vitality + state.vitalityBonus;
      return r;
    }
  }
};

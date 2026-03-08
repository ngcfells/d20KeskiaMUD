'use strict';

module.exports = {
  config: {
    name: "Physiology: Infernal Vessel",
    description: "A physiology sustained by infernal essence or metaphysical contracts.",
    type: "trait",
    family: "physiology_infernal_vessel",
    unique: true,
    persists: true
  },

  state: {
    hellfireRegenBonus: +3,
    stabilityBonus: +2,
    vitalityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.hellfireRegen === "number") r.hellfireRegen = current.hellfireRegen + state.hellfireRegenBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      if (typeof current.vitality === "number") r.vitality = current.vitality + state.vitalityBonus;
      return r;
    }
  }
};

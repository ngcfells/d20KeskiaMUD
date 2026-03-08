'use strict';

module.exports = {
  config: {
    name: "Physiology: Eldritch",
    description: "A physiology sustained by eldritch or non-Euclidean forces.",
    type: "trait",
    family: "physiology_eldritch",
    unique: true,
    persists: true
  },

  state: {
    entropyRegenBonus: +4,
    stabilityBonus: +1,
    vitalityBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.entropyRegen === "number") r.entropyRegen = current.entropyRegen + state.entropyRegenBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      if (typeof current.vitality === "number") r.vitality = current.vitality + state.vitalityBonus;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Eldritch Entropic Metabolism",
    description: "A metabolism sustained by entropic or non-Euclidean energy.",
    type: "trait",
    family: "physiology_eldritch_entropic_metabolism",
    unique: true,
    persists: true
  },

  state: {
    staminaBonus: +4,
    fatigueRate: -3,
    entropyRegenBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.entropyRegen === "number") r.entropyRegen = current.entropyRegen + state.entropyRegenBonus;
      if (typeof current.fatigueRate === "number") r.fatigueRate = current.fatigueRate + state.fatigueRate;
      return r;
    }
  }
};

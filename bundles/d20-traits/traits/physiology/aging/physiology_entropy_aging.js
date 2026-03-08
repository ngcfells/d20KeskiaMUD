'use strict';

module.exports = {
  config: {
    name: "Physiology: Entropy Aging",
    description: "A physiology that ages through entropic decay rather than time.",
    type: "trait",
    family: "physiology_entropy_aging",
    unique: true,
    persists: true
  },

  state: {
    entropySensitivityBonus: +3,
    madnessVulnerabilityBonus: +2,
    lifespanMultiplier: 1.5
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.entropySensitivity === "number") r.entropySensitivity = current.entropySensitivity + state.entropySensitivityBonus;
      if (typeof current.madnessVulnerability === "number") r.madnessVulnerability = current.madnessVulnerability + state.madnessVulnerabilityBonus;
      if (typeof current.lifespan === "number") r.lifespan = current.lifespan * state.lifespanMultiplier;
      return r;
    }
  }
};

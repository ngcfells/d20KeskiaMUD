'use strict';

module.exports = {
  config: {
    name: "Physiology: Standard Cognition",
    description: "A typical biological cognitive system with finite memory and processing.",
    type: "trait",
    family: "physiology_standard_cognition",
    unique: true,
    persists: true
  },

  state: {
    memoryCapacityBonus: 0,
    confusionVulnerabilityBonus: +1,
    charmVulnerabilityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.memoryCapacity === "number") r.memoryCapacity = current.memoryCapacity + state.memoryCapacityBonus;
      if (typeof current.confusionVulnerability === "number") r.confusionVulnerability = current.confusionVulnerability + state.confusionVulnerabilityBonus;
      if (typeof current.charmVulnerability === "number") r.charmVulnerability = current.charmVulnerability + state.charmVulnerabilityBonus;
      return r;
    }
  }
};

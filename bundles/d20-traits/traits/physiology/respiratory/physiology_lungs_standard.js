'use strict';

module.exports = {
  config: {
    name: "Physiology: Standard Lungs",
    description: "A typical air-breathing lung system.",
    type: "trait",
    family: "physiology_lungs_standard",
    unique: true,
    persists: true
  },

  state: {
    airRequirement: true,
    breathCapacityBonus: 0,
    airborneToxinVulnerability: 0
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.airRequirement) r.airRequirement = true;
      if (typeof current.breathCapacity === "number") r.breathCapacity = current.breathCapacity + state.breathCapacityBonus;
      if (typeof current.airborneToxinVulnerability === "number") r.airborneToxinVulnerability = current.airborneToxinVulnerability + state.airborneToxinVulnerability;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Hemal Circulation",
    description: "A circulatory system based on blood, vessels, and oxygen transport.",
    type: "trait",
    family: "physiology_hemal_circulation",
    unique: true,
    persists: true
  },

  state: {
    bleedVulnerabilityBonus: +1,
    healingEfficiencyBonus: +1,
    temperatureSensitivityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.bleedVulnerability === "number") r.bleedVulnerability = current.bleedVulnerability + state.bleedVulnerabilityBonus;
      if (typeof current.healingEfficiency === "number") r.healingEfficiency = current.healingEfficiency + state.healingEfficiencyBonus;
      if (typeof current.temperatureSensitivity === "number") r.temperatureSensitivity = current.temperatureSensitivity + state.temperatureSensitivityBonus;
      return r;
    }
  }
};

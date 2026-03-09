'use strict';

module.exports = {
  config: {
    name: "Physiology: Standard Skin",
    description: "A typical soft-tissue dermal layer found in humanoids and mammals.",
    type: "trait",
    family: "physiology_standard_skin",
    unique: true,
    persists: true
  },

  state: {
    naturalArmorBonus: 0,
    bleedVulnerabilityBonus: +1,
    heatLossRateBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.naturalArmor === "number") r.naturalArmor = current.naturalArmor + state.naturalArmorBonus;
      if (typeof current.bleedVulnerability === "number") r.bleedVulnerability = current.bleedVulnerability + state.bleedVulnerabilityBonus;
      if (typeof current.heatLossRate === "number") r.heatLossRate = current.heatLossRate + state.heatLossRateBonus;
      return r;
    }
  }
};

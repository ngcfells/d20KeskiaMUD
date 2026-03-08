'use strict';

module.exports = {
  config: {
    name: "Physiology: Scaled",
    description: "A dermal layer composed of overlapping scales.",
    type: "trait",
    family: "physiology_scaled",
    unique: true,
    persists: true
  },

  state: {
    naturalArmorBonus: +2,
    slashingResistBonus: +2,
    coldVulnerabilityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.naturalArmor === "number") r.naturalArmor = current.naturalArmor + state.naturalArmorBonus;
      if (typeof current.slashingResist === "number") r.slashingResist = current.slashingResist + state.slashingResistBonus;
      if (typeof current.coldVulnerability === "number") r.coldVulnerability = current.coldVulnerability + state.coldVulnerabilityBonus;
      return r;
    }
  }
};

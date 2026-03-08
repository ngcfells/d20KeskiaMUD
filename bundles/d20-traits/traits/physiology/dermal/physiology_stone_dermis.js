'use strict';

module.exports = {
  config: {
    name: "Physiology: Stone Dermis",
    description: "A dermal layer composed of stone-like or crystalline material.",
    type: "trait",
    family: "physiology_stone_dermis",
    unique: true,
    persists: true
  },

  state: {
    naturalArmorBonus: +5,
    slashingResistBonus: +3,
    thunderVulnerabilityBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.naturalArmor === "number") r.naturalArmor = current.naturalArmor + state.naturalArmorBonus;
      if (typeof current.slashingResist === "number") r.slashingResist = current.slashingResist + state.slashingResistBonus;
      if (typeof current.thunderVulnerability === "number") r.thunderVulnerability = current.thunderVulnerability + state.thunderVulnerabilityBonus;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Crystalline-Hardened",
    description: "A physiology composed of crystalline structures.",
    type: "trait",
    family: "physiology_crystalline_hardened",
    unique: true,
    persists: true
  },

  state: {
    slashingResistBonus: +4,
    piercingResistBonus: +2,
    thunderVulnerability: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.slashingResist === "number") r.slashingResist = current.slashingResist + state.slashingResistBonus;
      if (typeof current.piercingResist === "number") r.piercingResist = current.piercingResist + state.piercingResistBonus;
      if (state.thunderVulnerability) r.thunderVulnerability = true;
      return r;
    }
  }
};

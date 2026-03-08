'use strict';

module.exports = {
  config: {
    name: "Physiology: Cold-Resistant",
    description: "A physiology adapted to withstand freezing temperatures and cold damage.",
    type: "trait",
    family: "physiology_cold_resistant",
    unique: true,
    persists: true
  },

  state: {
    coldResistBonus: +5,
    fireVulnerability: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.coldResist === "number") r.coldResist = current.coldResist + state.coldResistBonus;
      if (state.fireVulnerability) r.fireVulnerability = true;
      return r;
    }
  }
};

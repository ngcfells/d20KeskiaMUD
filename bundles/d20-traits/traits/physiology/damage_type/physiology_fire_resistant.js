'use strict';

module.exports = {
  config: {
    name: "Physiology: Fire-Resistant",
    description: "A physiology adapted to withstand high temperatures and fire damage.",
    type: "trait",
    family: "physiology_fire_resistant",
    unique: true,
    persists: true
  },

  state: {
    fireResistBonus: +5,
    coldVulnerability: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.fireResist === "number") r.fireResist = current.fireResist + state.fireResistBonus;
      if (state.coldVulnerability) r.coldVulnerability = true;
      return r;
    }
  }
};

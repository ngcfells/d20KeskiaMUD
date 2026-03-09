'use strict';

module.exports = {
  config: {
    name: "Physiology: High Heat Endurance",
    description: "A physiology capable of functioning in extreme heat without fatigue.",
    type: "trait",
    family: "physiology_high_heat_endurance",
    unique: true,
    persists: true
  },

  state: {
    heatResistBonus: +4,
    fatigueResistBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.heatResist === "number") r.heatResist = current.heatResist + state.heatResistBonus;
      if (typeof current.fatigueResist === "number") r.fatigueResist = current.fatigueResist + state.fatigueResistBonus;
      return r;
    }
  }
};

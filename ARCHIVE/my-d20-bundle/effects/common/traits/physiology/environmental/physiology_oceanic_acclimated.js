'use strict';

module.exports = {
  config: {
    name: "Physiology: Oceanic Acclimated",
    description: "Adapted to coastal and island environments, resisting salt exposure, humidity, and sea fatigue.",
    type: "trait",
    family: "physiology_oceanic_acclimated",
    unique: true,
    persists: true
  },

  state: {
    saltResistBonus: +3,
    humidityResistBonus: +2,
    seaFatigueResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.saltResist === "number") r.saltResist = current.saltResist + state.saltResistBonus;
      if (typeof current.humidityResist === "number") r.humidityResist = current.humidityResist + state.humidityResistBonus;
      if (typeof current.seaFatigueResist === "number") r.seaFatigueResist = current.seaFatigueResist + state.seaFatigueResistBonus;
      return r;
    }
  }
};

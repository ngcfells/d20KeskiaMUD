'use strict';

module.exports = {
  config: {
    name: "Physiology: High Altitude Adaptation",
    description: "A physiology adapted to thin air, low oxygen, and extreme high-altitude conditions. The body maintains oxygenation efficiently and resists altitude sickness.",
    type: "trait",
    family: "physiology_high_altitude_adapted",
    unique: true,
    persists: true
  },

  state: {
    altitudeResistBonus: +4,
    coldResistBonus: +1,
    fatigueResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.altitudeResist === "number")
        r.altitudeResist = current.altitudeResist + state.altitudeResistBonus;

      if (typeof current.coldResist === "number")
        r.coldResist = current.coldResist + state.coldResistBonus;

      if (typeof current.fatigueResist === "number")
        r.fatigueResist = current.fatigueResist + state.fatigueResistBonus;

      return r;
    }
  }
};

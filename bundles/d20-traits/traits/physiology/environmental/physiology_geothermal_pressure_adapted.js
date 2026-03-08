'use strict';

module.exports = {
  config: {
    name: "Physiology: Geothermal Pressure Adaptation",
    description: "A physiology adapted to survive immense subterranean and geothermal pressure. The body is reinforced to withstand crushing force and deep-earth compression.",
    type: "trait",
    family: "physiology_geothermal_pressure_adapted",
    unique: true,
    persists: true
  },

  state: {
    pressureResistBonus: +4,
    fortitudeBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.pressureResist === "number")
        r.pressureResist = current.pressureResist + state.pressureResistBonus;

      if (typeof current.fortitude === "number")
        r.fortitude = current.fortitude + state.fortitudeBonus;

      return r;
    }
  }
};

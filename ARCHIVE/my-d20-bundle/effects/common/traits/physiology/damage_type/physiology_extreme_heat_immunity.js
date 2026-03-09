'use strict';

module.exports = {
  config: {
    name: "Physiology: Extreme Heat Immunity",
    description: "A physiology completely immune to extreme heat, volcanic temperatures, and non-epic magical fire. Heat cannot harm or fatigue the creature.",
    type: "trait",
    family: "physiology_extreme_heat_immunity",
    unique: true,
    persists: true
  },

  state: {
    fireImmunity: true,
    heatEnvironmentalImmunity: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      // Full fire immunity
      if (state.fireImmunity === true) {
        r.fireImmunity = true;

        // If the engine tracks fireResist, set it to a very high value
        if (typeof current.fireResist === "number")
          r.fireResist = 9999;
      }

      // Environmental heat immunity
      if (state.heatEnvironmentalImmunity === true) {
        r.heatExposureImmunity = true;
      }

      return r;
    }
  }
};

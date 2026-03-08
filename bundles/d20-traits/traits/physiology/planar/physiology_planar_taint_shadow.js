'use strict';

module.exports = {
  config: {
    name: "Physiology: Planar Taint (Shadow)",
    description: "Shadow corruption grants stealth and resistance to shadow magic, but deepens light sensitivity.",
    type: "trait",
    family: "physiology_planar_taint_shadow",
    unique: true,
    persists: true
  },

  state: {
    stealthBonus: 1,
    shadowResist: 2,
    extraLightSensitivity: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.stealth === "number")
        r.stealth = current.stealth + state.stealthBonus;

      if (typeof current.shadowResist === "number")
        r.shadowResist = current.shadowResist + state.shadowResist;

      if (typeof current.lightSensitivity === "number")
        r.lightSensitivity = current.lightSensitivity + state.extraLightSensitivity;

      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Gliding Locomotion",
    description: "A locomotion physiology enabling controlled gliding but not true flight.",
    type: "trait",
    family: "physiology_gliding",
    unique: true,
    persists: true
  },

  state: {
    glideSpeedMult: 1.0,
    maneuverBonus: +2,
    fallReductionBonus: +5
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.glideSpeed === "number") {
        r.glideSpeed = Math.floor(current.glideSpeed * state.glideSpeedMult);
      }

      if (typeof current.maneuver === "number") {
        r.maneuver = current.maneuver + state.maneuverBonus;
      }

      if (typeof current.fallReduction === "number") {
        r.fallReduction = current.fallReduction + state.fallReductionBonus;
      }

      return r;
    }
  }
};

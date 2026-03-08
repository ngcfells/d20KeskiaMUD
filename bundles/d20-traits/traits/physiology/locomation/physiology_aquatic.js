'use strict';

module.exports = {
  config: {
    name: "Physiology: Aquatic Locomotion",
    description: "A locomotion physiology optimized for swimming.",
    type: "trait",
    family: "physiology_aquatic",
    unique: true,
    persists: true
  },

  state: {
    swimSpeedMult: 1.5,
    landSpeedMult: 0.5,
    maneuverBonus: +2,
    stabilityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.swimSpeed === "number") {
        r.swimSpeed = Math.floor(current.swimSpeed * state.swimSpeedMult);
      }

      if (typeof current.speed === "number") {
        r.speed = Math.floor(current.speed * state.landSpeedMult);
      }

      if (typeof current.maneuver === "number") {
        r.maneuver = current.maneuver + state.maneuverBonus;
      }

      if (typeof current.stability === "number") {
        r.stability = current.stability + state.stabilityBonus;
      }

      return r;
    }
  }
};

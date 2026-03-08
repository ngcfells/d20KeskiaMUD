'use strict';

module.exports = {
  config: {
    name: "Physiology: Amphibious Locomotion",
    description: "A locomotion physiology adapted for both land and water.",
    type: "trait",
    family: "physiology_amphibious",
    unique: true,
    persists: true
  },

  state: {
    swimSpeedMult: 1.2,
    landSpeedMult: 1.0,
    maneuverBonus: +1,
    stabilityBonus: 0
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

      return r;
    }
  }
};

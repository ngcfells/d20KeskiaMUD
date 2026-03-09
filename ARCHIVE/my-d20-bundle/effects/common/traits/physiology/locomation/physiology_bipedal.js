'use strict';

module.exports = {
  config: {
    name: "Physiology: Bipedal Locomotion",
    description: "A locomotion physiology based on two primary load-bearing limbs.",
    type: "trait",
    family: "physiology_bipedal",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.0,
    stabilityBonus: 0,
    maneuverBonus: 0,
    climbMod: 0,
    jumpMod: 0
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.speed === "number") {
        r.speed = Math.floor(current.speed * state.speedMult);
      }

      if (typeof current.stability === "number") {
        r.stability = current.stability + state.stabilityBonus;
      }

      if (typeof current.maneuver === "number") {
        r.maneuver = current.maneuver + state.maneuverBonus;
      }

      if (typeof current.climb === "number") {
        r.climb = current.climb + state.climbMod;
      }

      if (typeof current.jump === "number") {
        r.jump = current.jump + state.jumpMod;
      }

      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Gastropod Locomotion",
    description: "A locomotion physiology based on muscular gliding and mucus traction.",
    type: "trait",
    family: "physiology_gastropod",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 0.6,
    stabilityBonus: +4,
    maneuverBonus: +2,
    climbMod: +3,
    slopePenaltyImmunity: true
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

      return r;
    }
  }
};

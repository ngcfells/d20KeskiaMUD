'use strict';

module.exports = {
  config: {
    name: "Physiology: Crawling Locomotion",
    description: "A locomotion physiology based on low-profile crawling.",
    type: "trait",
    family: "physiology_crawling",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 0.8,
    stabilityBonus: +3,
    maneuverBonus: +1,
    climbMod: +1,
    pronePenaltyImmunity: true
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

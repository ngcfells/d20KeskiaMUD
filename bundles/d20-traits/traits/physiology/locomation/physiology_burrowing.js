'use strict';

module.exports = {
  config: {
    name: "Physiology: Burrowing Locomotion",
    description: "A locomotion physiology specialized for subterranean movement.",
    type: "trait",
    family: "physiology_burrowing",
    unique: true,
    persists: true
  },

  state: {
    burrowSpeedMult: 1.2,
    stabilityBonus: +3,
    maneuverBonus: +1,
    tremorsenseBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.burrowSpeed === "number") {
        r.burrowSpeed = Math.floor(current.burrowSpeed * state.burrowSpeedMult);
      }

      if (typeof current.stability === "number") {
        r.stability = current.stability + state.stabilityBonus;
      }

      if (typeof current.maneuver === "number") {
        r.maneuver = current.maneuver + state.maneuverBonus;
      }

      if (typeof current.tremorsense === "number") {
        r.tremorsense = current.tremorsense + state.tremorsenseBonus;
      }

      return r;
    }
  }
};

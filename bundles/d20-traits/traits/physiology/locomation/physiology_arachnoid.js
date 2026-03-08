'use strict';

module.exports = {
  config: {
    name: "Physiology: Arachnoid Locomotion",
    description: "A locomotion physiology specialized for vertical and inverted movement.",
    type: "trait",
    family: "physiology_arachnoid",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.1,
    stabilityBonus: +2,
    maneuverBonus: +3,
    climbMod: +4,
    jumpMod: -1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      if (typeof current.maneuver === "number") r.maneuver = current.maneuver + state.maneuverBonus;
      if (typeof current.climb === "number") r.climb = current.climb + state.climbMod;
      if (typeof current.jump === "number") r.jump = current.jump + state.jumpMod;
      return r;
    }
  }
};

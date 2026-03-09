'use strict';

module.exports = {
  config: {
    name: "Physiology: Serpentine Locomotion",
    description: "A locomotion physiology based on lateral undulation and flexible movement.",
    type: "trait",
    family: "physiology_serpentine",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.05,
    stabilityBonus: +1,
    maneuverBonus: +4,
    climbMod: +2,
    jumpMod: -2,
    reachBonus: +5
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      if (typeof current.maneuver === "number") r.maneuver = current.maneuver + state.maneuverBonus;
      if (typeof current.climb === "number") r.climb = current.climb + state.climbMod;
      if (typeof current.jump === "number") r.jump = current.jump + state.jumpMod;
      if (typeof current.reach === "number") r.reach = current.reach + state.reachBonus;
      return r;
    }
  }
};

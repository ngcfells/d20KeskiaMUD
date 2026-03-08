'use strict';

module.exports = {
  config: {
    name: "Physiology: Flight (Muscular)",
    description: "A locomotion physiology based on wing-driven muscular flight.",
    type: "trait",
    family: "physiology_flight_muscular",
    unique: true,
    persists: true
  },

  state: {
    flySpeedMult: 1.0,
    maneuverBonus: +2,
    staminaCost: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.flySpeed === "number") r.flySpeed = Math.floor(current.flySpeed * state.flySpeedMult);
      if (typeof current.maneuver === "number") r.maneuver = current.maneuver + state.maneuverBonus;
      if (typeof current.staminaCost === "number") r.staminaCost = current.staminaCost + state.staminaCost;
      return r;
    }
  }
};

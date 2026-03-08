'use strict';

module.exports = {
  config: {
    name: "Physiology: Flight (Psionic)",
    description: "A locomotion physiology based on psionic or telekinetic lift.",
    type: "trait",
    family: "physiology_flight_psionic",
    unique: true,
    persists: true
  },

  state: {
    flySpeedMult: 1.2,
    maneuverBonus: +4,
    staminaCost: 0
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.flySpeed === "number") r.flySpeed = Math.floor(current.flySpeed * state.flySpeedMult);
      if (typeof current.maneuver === "number") r.maneuver = current.maneuver + state.maneuverBonus;
      return r;
    }
  }
};

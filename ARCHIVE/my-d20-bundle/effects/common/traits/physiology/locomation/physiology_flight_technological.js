'use strict';

module.exports = {
  config: {
    name: "Physiology: Flight (Technological)",
    description: "A locomotion physiology based on technological propulsion systems.",
    type: "trait",
    family: "physiology_flight_technological",
    unique: true,
    persists: true
  },

  state: {
    flySpeedMult: 1.3,
    maneuverBonus: +3,
    fuelCost: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.flySpeed === "number") r.flySpeed = Math.floor(current.flySpeed * state.flySpeedMult);
      if (typeof current.maneuver === "number") r.maneuver = current.maneuver + state.maneuverBonus;
      if (typeof current.fuelCost === "number") r.fuelCost = current.fuelCost + state.fuelCost;
      return r;
    }
  }
};

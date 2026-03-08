'use strict';

module.exports = {
  config: {
    name: "Physiology: Hovering Locomotion",
    description: "A locomotion physiology that negates terrain contact.",
    type: "trait",
    family: "physiology_hovering",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.0,
    stabilityBonus: +1,
    maneuverBonus: +3,
    terrainPenaltyImmunity: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.maneuver === "number") r.maneuver = current.maneuver + state.maneuverBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      return r;
    }
  }
};

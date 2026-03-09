'use strict';

module.exports = {
  config: {
    name: "Physiology: High-Altitude Lungs",
    description: "A respiratory system adapted to thin air and low oxygen environments.",
    type: "trait",
    family: "physiology_lungs_high_altitude",
    unique: true,
    persists: true
  },

  state: {
    airRequirement: true,
    breathCapacityBonus: +2,
    altitudeToleranceBonus: +4
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.airRequirement) r.airRequirement = true;
      if (typeof current.breathCapacity === "number") r.breathCapacity = current.breathCapacity + state.breathCapacityBonus;
      if (typeof current.altitudeTolerance === "number") r.altitudeTolerance = current.altitudeTolerance + state.altitudeToleranceBonus;
      return r;
    }
  }
};

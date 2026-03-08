'use strict';

module.exports = {
  config: {
    name: "Physiology: Vacuum-Adapted",
    description: "A physiology adapted to survive in vacuum without respiration.",
    type: "trait",
    family: "physiology_vacuum_adapted",
    unique: true,
    persists: true
  },

  state: {
    noBreathing: true,
    vacuumSurvival: true,
    pressureChangeImmunity: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.noBreathing) r.noBreathing = true;
      if (state.vacuumSurvival) r.vacuumSurvival = true;
      if (state.pressureChangeImmunity) r.pressureChangeImmunity = true;
      return r;
    }
  }
};

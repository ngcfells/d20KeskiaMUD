'use strict';

module.exports = {
  config: {
    name: "Physiology: Thermal Vision",
    description: "A visual system capable of perceiving heat signatures.",
    type: "trait",
    family: "physiology_thermal_vision",
    unique: true,
    persists: true
  },

  state: {
    thermalAwarenessBonus: +3,
    perceptionBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.thermalAwareness === "number") r.thermalAwareness = current.thermalAwareness + state.thermalAwarenessBonus;
      if (typeof current.perception === "number") r.perception = current.perception + state.perceptionBonus;
      return r;
    }
  }
};

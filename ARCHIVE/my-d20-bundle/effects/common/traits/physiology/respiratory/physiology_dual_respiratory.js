'use strict';

module.exports = {
  config: {
    name: "Physiology: Dual Respiratory System",
    description: "A respiratory system capable of breathing both air and water.",
    type: "trait",
    family: "physiology_dual_respiratory",
    unique: true,
    persists: true
  },

  state: {
    airBreathing: true,
    waterBreathing: true,
    breathCapacityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.airBreathing) r.airBreathing = true;
      if (state.waterBreathing) r.waterBreathing = true;
      if (typeof current.breathCapacity === "number") r.breathCapacity = current.breathCapacity + state.breathCapacityBonus;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Gills",
    description: "A respiratory system that extracts oxygen from water.",
    type: "trait",
    family: "physiology_gills",
    unique: true,
    persists: true
  },

  state: {
    waterBreathing: true,
    airBreathing: false,
    suffocationInAir: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.waterBreathing) r.waterBreathing = true;
      if (!state.airBreathing) r.airBreathing = false;
      if (state.suffocationInAir) r.suffocationInAir = true;
      return r;
    }
  }
};

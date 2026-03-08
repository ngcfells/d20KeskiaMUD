'use strict';

module.exports = {
  config: {
    name: "Physiology: Cosmic Taint",
    description: "Exposure to cosmic radiation and extradimensional forces alters perception and grants resistance to cosmic energies.",
    type: "trait",
    family: "physiology_cosmic_taint",
    unique: true,
    persists: true
  },

  state: {
    cosmicResist: 2,
    perceptionShift: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.cosmicResist === "number")
        r.cosmicResist = current.cosmicResist + state.cosmicResist;

      if (typeof current.perceptionShift === "number")
        r.perceptionShift = current.perceptionShift + state.perceptionShift;

      return r;
    }
  }
};

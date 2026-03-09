'use strict';

module.exports = {
  config: {
    name: "Physiology: Planar Taint (Void)",
    description: "Void corruption warps perception and grants resistance to cosmic energies.",
    type: "trait",
    family: "physiology_planar_taint_void",
    unique: true,
    persists: true
  },

  state: {
    voidResist: 2,
    perceptionWarp: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.voidResist === "number")
        r.voidResist = current.voidResist + state.voidResist;

      if (typeof current.perceptionWarp === "number")
        r.perceptionWarp = current.perceptionWarp + state.perceptionWarp;

      return r;
    }
  }
};

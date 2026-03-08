'use strict';

module.exports = {
  config: {
    name: "Physiology: Planar Taint (Daemonic)",
    description: "Daemonic corruption grants resistance to poison and acid, and hardens the mind against despair.",
    type: "trait",
    family: "physiology_planar_taint_daemonic",
    unique: true,
    persists: true
  },

  state: {
    poisonResist: 2,
    acidResist: 2,
    despairResist: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.poisonResist === "number")
        r.poisonResist = current.poisonResist + state.poisonResist;

      if (typeof current.acidResist === "number")
        r.acidResist = current.acidResist + state.acidResist;

      if (typeof current.despairResist === "number")
        r.despairResist = current.despairResist + state.despairResist;

      return r;
    }
  }
};

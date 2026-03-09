'use strict';

module.exports = {
  config: {
    name: "Physiology: Planar Taint (Infernal)",
    description: "Infernal corruption grants resistance to fire and dark magic, but radiates oppressive energy.",
    type: "trait",
    family: "physiology_planar_taint_infernal",
    unique: true,
    persists: true
  },

  state: {
    fireResist: 2,
    fearResist: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.fireResist === "number")
        r.fireResist = current.fireResist + state.fireResist;

      if (typeof current.fearResist === "number")
        r.fearResist = current.fearResist + state.fearResist;

      return r;
    }
  }
};

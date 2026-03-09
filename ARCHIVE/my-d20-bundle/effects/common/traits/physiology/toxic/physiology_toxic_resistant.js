'use strict';

module.exports = {
  config: {
    name: "Physiology: Toxic Resistant",
    description: "Adaptation to polluted or magically toxic environments grants resistance to toxins and hazardous waste.",
    type: "trait",
    family: "physiology_toxic_resistant",
    unique: true,
    persists: true
  },

  state: {
    toxinResist: 2,
    radiationResist: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.toxinResist === "number")
        r.toxinResist = current.toxinResist + state.toxinResist;

      if (typeof current.radiationResist === "number")
        r.radiationResist = current.radiationResist + state.radiationResist;

      return r;
    }
  }
};

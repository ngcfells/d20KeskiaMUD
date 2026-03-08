'use strict';

module.exports = {
  config: {
    name: "Physiology: Underdark Hazard Resistant",
    description: "Adaptation to subterranean hazards such as spores, toxic molds, underground gases, and tremors.",
    type: "trait",
    family: "physiology_underdark_hazard_resistant",
    unique: true,
    persists: true
  },

  state: {
    sporeResist: 2,
    gasResist: 2,
    tremorSenseBonus: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.sporeResist === "number")
        r.sporeResist = current.sporeResist + state.sporeResist;

      if (typeof current.gasResist === "number")
        r.gasResist = current.gasResist + state.gasResist;

      if (typeof current.tremorSense === "number")
        r.tremorSense = current.tremorSense + state.tremorSenseBonus;

      return r;
    }
  }
};

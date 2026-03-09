'use strict';

module.exports = {
  config: {
    name: "Physiology: Planar Taint (Abyssal)",
    description: "Abyssal corruption fuels rage and grants resistance to demonic energies.",
    type: "trait",
    family: "physiology_planar_taint_abyssal",
    unique: true,
    persists: true
  },

  state: {
    rageBonus: 1,
    demonicResist: 2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.rage === "number")
        r.rage = current.rage + state.rageBonus;

      if (typeof current.demonicResist === "number")
        r.demonicResist = current.demonicResist + state.demonicResist;

      return r;
    }
  }
};

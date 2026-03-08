'use strict';

module.exports = {
  config: {
    name: "Physiology: Cybernetic Adapted",
    description: "A body adapted to cybernetic augmentation, reducing strain and improving interface stability.",
    type: "trait",
    family: "physiology_cybernetic_adapted",
    unique: true,
    persists: true
  },

  state: {
    cyberStressReduction: 1,
    interfaceBonus: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.cyberStress === "number")
        r.cyberStress = current.cyberStress - state.cyberStressReduction;

      if (typeof current.interface === "number")
        r.interface = current.interface + state.interfaceBonus;

      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Arcane Lattice Cortex",
    description: "A neural architecture interwoven with arcane channels and runic microstructures.",
    type: "trait",
    family: "physiology_arcane_lattice_cortex",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.1,
    initiativeBonus: +2,
    magicStabilityBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.speed === "number") {
        r.speed = Math.floor(current.speed * state.speedMult);
      }

      if (typeof current.initiative === "number") {
        r.initiative = current.initiative + state.initiativeBonus;
      }

      if (typeof current.magicStability === "number") {
        r.magicStability = current.magicStability + state.magicStabilityBonus;
      }

      return r;
    }
  }
};

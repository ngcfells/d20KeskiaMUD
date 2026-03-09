'use strict';

module.exports = {
  config: {
    name: "Physiology: Stone Resonance",
    description: "A dermal resonance with stone, enhancing stability and physical resistance.",
    type: "trait",
    family: "physiology_stone_resonance",
    unique: true,
    persists: true
  },

  state: {
    stabilityBonus: +2,
    slashingResistBonus: +1,
    bludgeoningResistBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      if (typeof current.slashingResist === "number") r.slashingResist = current.slashingResist + state.slashingResistBonus;
      if (typeof current.bludgeoningResist === "number") r.bludgeoningResist = current.bludgeoningResist + state.bludgeoningResistBonus;
      return r;
    }
  }
};

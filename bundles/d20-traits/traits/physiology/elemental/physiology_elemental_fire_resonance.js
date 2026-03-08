'use strict';

module.exports = {
  config: {
    name: "Physiology: Elemental Fire Resonance",
    description: "A physiology harmonized with elemental fire.",
    type: "trait",
    family: "physiology_elemental_fire_resonance",
    unique: true,
    persists: true
  },

  state: {
    fireResistBonus: +3,
    heatAffinityBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.fireResist === "number") r.fireResist = current.fireResist + state.fireResistBonus;
      if (typeof current.heatAffinity === "number") r.heatAffinity = current.heatAffinity + state.heatAffinityBonus;
      return r;
    }
  }
};

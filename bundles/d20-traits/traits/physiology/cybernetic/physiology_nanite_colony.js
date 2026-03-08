'use strict';

module.exports = {
  config: {
    name: "Physiology: Nanite Colony",
    description: "A physiology maintained and repaired by internal nanomachines.",
    type: "trait",
    family: "physiology_nanite_colony",
    unique: true,
    persists: true
  },

  state: {
    regenBonus: +4,
    durabilityBonus: +2,
    adaptationBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.regen === "number") r.regen = current.regen + state.regenBonus;
      if (typeof current.durability === "number") r.durability = current.durability + state.durabilityBonus;
      if (typeof current.adaptation === "number") r.adaptation = current.adaptation + state.adaptationBonus;
      return r;
    }
  }
};

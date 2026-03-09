'use strict';

module.exports = {
  config: {
    name: "Physiology: Psionic Core",
    description: "A physiology sustained by a psionic energy nexus.",
    type: "trait",
    family: "physiology_psionic_core",
    unique: true,
    persists: true
  },

  state: {
    psiCapacityBonus: +3,
    psiRegenBonus: +3,
    stabilityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.psiCapacity === "number") r.psiCapacity = current.psiCapacity + state.psiCapacityBonus;
      if (typeof current.psiRegen === "number") r.psiRegen = current.psiRegen + state.psiRegenBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      return r;
    }
  }
};

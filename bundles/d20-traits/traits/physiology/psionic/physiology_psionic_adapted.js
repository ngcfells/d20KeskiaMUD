'use strict';

module.exports = {
  config: {
    name: "Physiology: Psionic Adapted",
    description: "A physiology with innate psionic channels and mental reinforcement.",
    type: "trait",
    family: "physiology_psionic_adapted",
    unique: true,
    persists: true
  },

  state: {
    psiCapacityBonus: +2,
    psychicResistBonus: +2,
    psiRegenBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.psiCapacity === "number") r.psiCapacity = current.psiCapacity + state.psiCapacityBonus;
      if (typeof current.psychicResist === "number") r.psychicResist = current.psychicResist + state.psychicResistBonus;
      if (typeof current.psiRegen === "number") r.psiRegen = current.psiRegen + state.psiRegenBonus;
      return r;
    }
  }
};

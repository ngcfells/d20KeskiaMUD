'use strict';

module.exports = {
  config: {
    name: "Physiology: Arcane Core",
    description: "A physiology sustained by an internal arcane core.",
    type: "trait",
    family: "physiology_arcane_core",
    unique: true,
    persists: true
  },

  state: {
    manaCapacityBonus: +3,
    manaRegenBonus: +2,
    stabilityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.manaCapacity === "number") r.manaCapacity = current.manaCapacity + state.manaCapacityBonus;
      if (typeof current.manaRegen === "number") r.manaRegen = current.manaRegen + state.manaRegenBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      return r;
    }
  }
};

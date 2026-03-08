'use strict';

module.exports = {
  config: {
    name: "Physiology: Arcane-Cybernetic Fusion",
    description: "Cybernetic systems fused with arcane energy channels.",
    type: "trait",
    family: "physiology_arcane_cybernetic_fusion",
    unique: true,
    persists: true
  },

  state: {
    manaRegenBonus: +2,
    durabilityBonus: +2,
    stabilityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.manaRegen === "number") r.manaRegen = current.manaRegen + state.manaRegenBonus;
      if (typeof current.durability === "number") r.durability = current.durability + state.durabilityBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      return r;
    }
  }
};

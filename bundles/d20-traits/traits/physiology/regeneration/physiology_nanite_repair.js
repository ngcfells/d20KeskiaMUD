'use strict';

module.exports = {
  config: {
    name: "Physiology: Nanite Repair",
    description: "Nanites repair biological and synthetic structures.",
    type: "trait",
    family: "physiology_nanite_repair",
    unique: true,
    persists: true
  },

  state: {
    regenBonus: +5,
    durabilityRegenBonus: +3,
    adaptationBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.regen === "number") r.regen = current.regen + state.regenBonus;
      if (typeof current.durabilityRegen === "number") r.durabilityRegen = current.durabilityRegen + state.durabilityRegenBonus;
      if (typeof current.adaptation === "number") r.adaptation = current.adaptation + state.adaptationBonus;
      return r;
    }
  }
};

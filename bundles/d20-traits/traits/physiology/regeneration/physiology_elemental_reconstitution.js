'use strict';

module.exports = {
  config: {
    name: "Physiology: Elemental Reconstitution",
    description: "Elemental bodies reform from their native element.",
    type: "trait",
    family: "physiology_elemental_reconstitution",
    unique: true,
    persists: true
  },

  state: {
    elementalRegenBonus: +5,
    stabilityBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.elementalRegen === "number") r.elementalRegen = current.elementalRegen + state.elementalRegenBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Chemosynthetic Metabolism",
    description: "A metabolism that derives energy from chemical reactions rather than light.",
    type: "trait",
    family: "physiology_chemosynthetic_metabolism",
    unique: true,
    persists: true
  },

  state: {
    staminaBonus: +2,
    fatigueRate: 0,
    toxinResistanceBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.stamina === "number") r.stamina = current.stamina + state.staminaBonus;
      if (typeof current.toxinResistance === "number") r.toxinResistance = current.toxinResistance + state.toxinResistanceBonus;
      return r;
    }
  }
};

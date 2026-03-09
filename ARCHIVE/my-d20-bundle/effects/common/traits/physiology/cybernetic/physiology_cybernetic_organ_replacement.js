'use strict';

module.exports = {
  config: {
    name: "Physiology: Cybernetic Organ Replacement",
    description: "Synthetic organs replace biological ones, improving efficiency.",
    type: "trait",
    family: "physiology_cybernetic_organ_replacement",
    unique: true,
    persists: true
  },

  state: {
    staminaBonus: +3,
    toxinResistanceBonus: +2,
    fatigueRate: -1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.stamina === "number") r.stamina = current.stamina + state.staminaBonus;
      if (typeof current.toxinResistance === "number") r.toxinResistance = current.toxinResistance + state.toxinResistanceBonus;
      if (typeof current.fatigueRate === "number") r.fatigueRate = current.fatigueRate + state.fatigueRate;
      return r;
    }
  }
};

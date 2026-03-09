'use strict';

module.exports = {
  config: {
    name: "Physiology: Hyperreactive Immune System",
    description: "An immune system with extremely strong responses but high metabolic cost.",
    type: "trait",
    family: "physiology_hyperreactive_immune_system",
    unique: true,
    persists: true
  },

  state: {
    diseaseResistBonus: +3,
    poisonResistBonus: +3,
    toxinResistBonus: +2,
    fatigueRate: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.diseaseResist === "number") r.diseaseResist = current.diseaseResist + state.diseaseResistBonus;
      if (typeof current.poisonResist === "number") r.poisonResist = current.poisonResist + state.poisonResistBonus;
      if (typeof current.toxinResist === "number") r.toxinResist = current.toxinResist + state.toxinResistBonus;
      if (typeof current.fatigueRate === "number") r.fatigueRate = current.fatigueRate + state.fatigueRate;
      return r;
    }
  }
};

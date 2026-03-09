'use strict';

module.exports = {
  config: {
    name: "Physiology: Filth Hardened Immune System",
    description: "An immune system adapted to polluted, disease-ridden environments.",
    type: "trait",
    family: "physiology_filth_hardened_immune_system",
    unique: true,
    persists: true
  },

  state: {
    diseaseResistBonus: +5,
    toxinResistBonus: +3,
    poisonResistBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.diseaseResist === "number") r.diseaseResist = current.diseaseResist + state.diseaseResistBonus;
      if (typeof current.toxinResist === "number") r.toxinResist = current.toxinResist + state.toxinResistBonus;
      if (typeof current.poisonResist === "number") r.poisonResist = current.poisonResist + state.poisonResistBonus;
      return r;
    }
  }
};

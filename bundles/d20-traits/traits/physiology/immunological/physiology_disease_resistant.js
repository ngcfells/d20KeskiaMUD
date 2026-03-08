'use strict';

module.exports = {
  config: {
    name: "Physiology: Disease Resistant",
    description: "An immune system adapted to resist common pathogens and infections.",
    type: "trait",
    family: "physiology_disease_resistant",
    unique: true,
    persists: true
  },

  state: {
    diseaseResistBonus: +3,
    toxinResistBonus: +1,
    poisonResistBonus: +0
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

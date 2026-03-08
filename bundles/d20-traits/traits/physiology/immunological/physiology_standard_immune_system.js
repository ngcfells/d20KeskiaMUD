'use strict';

module.exports = {
  config: {
    name: "Physiology: Standard Immune System",
    description: "A typical biological immune system with balanced responses.",
    type: "trait",
    family: "physiology_standard_immune_system",
    unique: true,
    persists: true
  },

  state: {
    diseaseResistBonus: +1,
    poisonResistBonus: +1,
    toxinResistBonus: 0,
    corruptionResistBonus: 0
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.diseaseResist === "number") r.diseaseResist = current.diseaseResist + state.diseaseResistBonus;
      if (typeof current.poisonResist === "number") r.poisonResist = current.poisonResist + state.poisonResistBonus;
      if (typeof current.toxinResist === "number") r.toxinResist = current.toxinResist + state.toxinResistBonus;
      if (typeof current.corruptionResist === "number") r.corruptionResist = current.corruptionResist + state.corruptionResistBonus;
      return r;
    }
  }
};

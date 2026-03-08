'use strict';

module.exports = {
  config: {
    name: "Physiology: Suppressed Immune System",
    description: "A weakened immune system with reduced resistance to afflictions.",
    type: "trait",
    family: "physiology_suppressed_immune_system",
    unique: true,
    persists: true
  },

  state: {
    diseaseResistBonus: -2,
    poisonResistBonus: -2,
    toxinResistBonus: -1,
    corruptionResistBonus: -1
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

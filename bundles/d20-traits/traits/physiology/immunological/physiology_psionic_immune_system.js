'use strict';

module.exports = {
  config: {
    name: "Physiology: Psionic Immune System",
    description: "A physiology with psionic detoxification and mental shielding.",
    type: "trait",
    family: "physiology_psionic_immune_system",
    unique: true,
    persists: true
  },

  state: {
    diseaseResistBonus: +2,
    poisonResistBonus: +1,
    psychicResistBonus: +4
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.diseaseResist === "number") r.diseaseResist = current.diseaseResist + state.diseaseResistBonus;
      if (typeof current.poisonResist === "number") r.poisonResist = current.poisonResist + state.poisonResistBonus;
      if (typeof current.psychicResist === "number") r.psychicResist = current.psychicResist + state.psychicResistBonus;
      return r;
    }
  }
};

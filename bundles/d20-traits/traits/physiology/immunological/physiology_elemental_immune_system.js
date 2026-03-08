'use strict';

module.exports = {
  config: {
    name: "Physiology: Elemental Immune System",
    description: "An immune system based on elemental resonance rather than biology.",
    type: "trait",
    family: "physiology_elemental_immune_system",
    unique: true,
    persists: true
  },

  state: {
    diseaseImmunity: true,
    poisonImmunity: true,
    toxinImmunity: true,
    elementalResistBonus: +4
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.diseaseImmunity) r.diseaseImmunity = true;
      if (state.poisonImmunity) r.poisonImmunity = true;
      if (state.toxinImmunity) r.toxinImmunity = true;
      if (typeof current.elementalResist === "number") r.elementalResist = current.elementalResist + state.elementalResistBonus;
      return r;
    }
  }
};

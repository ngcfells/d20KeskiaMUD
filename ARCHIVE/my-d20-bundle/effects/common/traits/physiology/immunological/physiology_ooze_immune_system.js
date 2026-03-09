'use strict';

module.exports = {
  config: {
    name: "Physiology: Ooze Immune System",
    description: "A physiology based on chemical dissolution and osmotic defense.",
    type: "trait",
    family: "physiology_ooze_immune_system",
    unique: true,
    persists: true
  },

  state: {
    diseaseImmunity: true,
    poisonImmunity: true,
    toxinImmunity: true,
    acidResistBonus: +4
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.diseaseImmunity) r.diseaseImmunity = true;
      if (state.poisonImmunity) r.poisonImmunity = true;
      if (state.toxinImmunity) r.toxinImmunity = true;
      if (typeof current.acidResist === "number") r.acidResist = current.acidResist + state.acidResistBonus;
      return r;
    }
  }
};

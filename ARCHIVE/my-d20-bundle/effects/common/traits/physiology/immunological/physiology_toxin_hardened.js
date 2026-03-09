'use strict';

module.exports = {
  config: {
    name: "Physiology: Toxin Hardened",
    description: "A physiology adapted to toxic subterranean environments.",
    type: "trait",
    family: "physiology_toxin_hardened",
    unique: true,
    persists: true
  },

  state: {
    toxinResistBonus: +4,
    poisonResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.toxinResist === "number") r.toxinResist = current.toxinResist + state.toxinResistBonus;
      if (typeof current.poisonResist === "number") r.poisonResist = current.poisonResist + state.poisonResistBonus;
      return r;
    }
  }
};

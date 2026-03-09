'use strict';

module.exports = {
  config: {
    name: "Physiology: Poison-Resistant",
    description: "A physiology adapted to neutralize toxins and venoms.",
    type: "trait",
    family: "physiology_poison_resistant",
    unique: true,
    persists: true
  },

  state: {
    poisonResistBonus: +5,
    toxinResistBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.poisonResist === "number") r.poisonResist = current.poisonResist + state.poisonResistBonus;
      if (typeof current.toxinResist === "number") r.toxinResist = current.toxinResist + state.toxinResistBonus;
      return r;
    }
  }
};

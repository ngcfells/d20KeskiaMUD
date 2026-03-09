'use strict';

module.exports = {
  config: {
    name: "Physiology: Psychic-Shielded",
    description: "A physiology with innate resistance to psychic damage.",
    type: "trait",
    family: "physiology_psychic_shielded",
    unique: true,
    persists: true
  },

  state: {
    psychicResistBonus: +5
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.psychicResist === "number") r.psychicResist = current.psychicResist + state.psychicResistBonus;
      return r;
    }
  }
};

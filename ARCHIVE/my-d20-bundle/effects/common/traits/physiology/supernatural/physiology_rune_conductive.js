'use strict';

module.exports = {
  config: {
    name: "Physiology: Rune Conductive",
    description: "A physiology capable of channeling runic or arcane energies.",
    type: "trait",
    family: "physiology_rune_conductive",
    unique: true,
    persists: true
  },

  state: {
    arcaneAffinityBonus: +2,
    magicResistBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.arcaneAffinity === "number") r.arcaneAffinity = current.arcaneAffinity + state.arcaneAffinityBonus;
      if (typeof current.magicResist === "number") r.magicResist = current.magicResist + state.magicResistBonus;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Psionic Circulation",
    description: "A circulatory system based on psionic energy flow.",
    type: "trait",
    family: "physiology_psionic_circulation",
    unique: true,
    persists: true
  },

  state: {
    bleedImmunity: true,
    psychicResistBonus: +3,
    psiRegenBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.bleedImmunity) r.bleedImmunity = true;
      if (typeof current.psychicResist === "number") r.psychicResist = current.psychicResist + state.psychicResistBonus;
      if (typeof current.psiRegen === "number") r.psiRegen = current.psiRegen + state.psiRegenBonus;
      return r;
    }
  }
};

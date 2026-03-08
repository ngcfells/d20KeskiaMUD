'use strict';

module.exports = {
  config: {
    name: "Physiology: Lightning-Conductive",
    description: "A physiology that channels electrical energy safely.",
    type: "trait",
    family: "physiology_lightning_conductive",
    unique: true,
    persists: true
  },

  state: {
    lightningResistBonus: +5,
    thunderResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.lightningResist === "number") r.lightningResist = current.lightningResist + state.lightningResistBonus;
      if (typeof current.thunderResist === "number") r.thunderResist = current.thunderResist + state.thunderResistBonus;
      return r;
    }
  }
};

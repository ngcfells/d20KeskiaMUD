'use strict';

module.exports = {
  config: {
    name: "Physiology: Cursed",
    description: "A physiology altered by persistent curse effects.",
    type: "trait",
    family: "physiology_cursed",
    unique: true,
    persists: true
  },

  state: {
    stabilityBonus: -2,
    vitalityBonus: -1,
    cursePowerBonus: +4
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      if (typeof current.vitality === "number") r.vitality = current.vitality + state.vitalityBonus;
      if (typeof current.cursePower === "number") r.cursePower = current.cursePower + state.cursePowerBonus;
      return r;
    }
  }
};

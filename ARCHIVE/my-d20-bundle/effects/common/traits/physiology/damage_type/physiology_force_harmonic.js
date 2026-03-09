'use strict';

module.exports = {
  config: {
    name: "Physiology: Force-Harmonic",
    description: "A physiology harmonized with the Force, resisting Force-based damage.",
    type: "trait",
    family: "physiology_force_harmonic",
    unique: true,
    persists: true
  },

  state: {
    forceResistBonus: +5,
    corruptionResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.forceResist === "number") r.forceResist = current.forceResist + state.forceResistBonus;
      if (typeof current.corruptionResist === "number") r.corruptionResist = current.corruptionResist + state.corruptionResistBonus;
      return r;
    }
  }
};

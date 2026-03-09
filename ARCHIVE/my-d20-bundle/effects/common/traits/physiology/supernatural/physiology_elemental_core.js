'use strict';

module.exports = {
  config: {
    name: "Physiology: Elemental Core",
    description: "A physiology sustained by a bound elemental core.",
    type: "trait",
    family: "physiology_elemental_core",
    unique: true,
    persists: true
  },

  state: {
    elementalPowerBonus: +3,
    elementalRegenBonus: +2,
    stabilityBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.elementalPower === "number") r.elementalPower = current.elementalPower + state.elementalPowerBonus;
      if (typeof current.elementalRegen === "number") r.elementalRegen = current.elementalRegen + state.elementalRegenBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      return r;
    }
  }
};

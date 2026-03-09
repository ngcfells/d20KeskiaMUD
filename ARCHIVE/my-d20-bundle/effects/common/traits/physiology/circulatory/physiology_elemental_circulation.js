'use strict';

module.exports = {
  config: {
    name: "Physiology: Elemental Circulation",
    description: "A circulatory system based on elemental essence rather than fluids.",
    type: "trait",
    family: "physiology_elemental_circulation",
    unique: true,
    persists: true
  },

  state: {
    bleedImmunity: true,
    elementalRegenBonus: +2,
    temperatureSensitivityBonus: -3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.bleedImmunity) r.bleedImmunity = true;
      if (typeof current.elementalRegen === "number") r.elementalRegen = current.elementalRegen + state.elementalRegenBonus;
      if (typeof current.temperatureSensitivity === "number") r.temperatureSensitivity = current.temperatureSensitivity + state.temperatureSensitivityBonus;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Force Respiration",
    description: "A physiology sustained by the Force, requiring no air.",
    type: "trait",
    family: "physiology_force_respiration",
    unique: true,
    persists: true
  },

  state: {
    noBreathing: true,
    suffocationImmunity: true,
    airborneToxinResistBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.noBreathing) r.noBreathing = true;
      if (state.suffocationImmunity) r.suffocationImmunity = true;
      if (typeof current.airborneToxinResist === "number") r.airborneToxinResist = current.airborneToxinResist + state.airborneToxinResistBonus;
      return r;
    }
  }
};

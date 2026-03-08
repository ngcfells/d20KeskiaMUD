'use strict';

module.exports = {
  config: {
    name: "Physiology: Ooze Respiration",
    description: "A physiology that exchanges gases through osmotic diffusion.",
    type: "trait",
    family: "physiology_ooze_respiration",
    unique: true,
    persists: true
  },

  state: {
    noBreathing: true,
    suffocationImmunity: true,
    airborneToxinImmunity: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.noBreathing) r.noBreathing = true;
      if (state.suffocationImmunity) r.suffocationImmunity = true;
      if (state.airborneToxinImmunity) r.airborneToxinImmunity = true;
      return r;
    }
  }
};

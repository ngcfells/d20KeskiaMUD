'use strict';

module.exports = {
  config: {
    name: "Physiology: Undead Respiration",
    description: "A necrotic physiology that does not require breathing.",
    type: "trait",
    family: "physiology_undead_respiration",
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

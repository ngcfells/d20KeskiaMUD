'use strict';

module.exports = {
  config: {
    name: "Physiology: Elemental Respiration",
    description: "A physiology that breathes through elemental resonance rather than gases.",
    type: "trait",
    family: "physiology_elemental_respiration",
    unique: true,
    persists: true
  },

  state: {
    noBreathing: true,
    elementalResonanceBreathing: true,
    airborneToxinImmunity: true,
    suffocationImmunity: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.noBreathing) r.noBreathing = true;
      if (state.elementalResonanceBreathing) r.elementalResonanceBreathing = true;
      if (state.airborneToxinImmunity) r.airborneToxinImmunity = true;
      if (state.suffocationImmunity) r.suffocationImmunity = true;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Psionic Respiration",
    description: "A physiology that exchanges energy through psionic fields rather than gases.",
    type: "trait",
    family: "physiology_psionic_respiration",
    unique: true,
    persists: true
  },

  state: {
    noBreathing: true,
    suffocationImmunity: true,
    psychicResonanceBreathing: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.noBreathing) r.noBreathing = true;
      if (state.suffocationImmunity) r.suffocationImmunity = true;
      if (state.psychicResonanceBreathing) r.psychicResonanceBreathing = true;
      return r;
    }
  }
};

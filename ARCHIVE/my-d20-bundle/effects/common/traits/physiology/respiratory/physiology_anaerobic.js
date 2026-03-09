'use strict';

module.exports = {
  config: {
    name: "Physiology: Anaerobic",
    description: "A physiology that does not require oxygen and is unaffected by suffocation.",
    type: "trait",
    family: "physiology_anaerobic",
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

'use strict';

module.exports = {
  config: {
    name: "Physiology: Psionic Cognition",
    description: "A cognitive system enhanced by psionic bandwidth and mental shielding.",
    type: "trait",
    family: "physiology_psionic_cognition",
    unique: true,
    persists: true
  },

  state: {
    memoryCapacityBonus: +3,
    psychicResistBonus: +3,
    confusionResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.memoryCapacity === "number") r.memoryCapacity = current.memoryCapacity + state.memoryCapacityBonus;
      if (typeof current.psychicResist === "number") r.psychicResist = current.psychicResist + state.psychicResistBonus;
      if (typeof current.confusionResist === "number") r.confusionResist = current.confusionResist + state.confusionResistBonus;
      return r;
    }
  }
};

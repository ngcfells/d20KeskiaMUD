'use strict';

module.exports = {
  config: {
    name: "Physiology: Eldritch-Cybernetic Hybridization",
    description: "Cybernetic systems fused with non-Euclidean or eldritch structures.",
    type: "trait",
    family: "physiology_eldritch_cybernetic_hybridization",
    unique: true,
    persists: true
  },

  state: {
    entropyRegenBonus: +3,
    durabilityBonus: +1,
    stabilityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.entropyRegen === "number") r.entropyRegen = current.entropyRegen + state.entropyRegenBonus;
      if (typeof current.durability === "number") r.durability = current.durability + state.durabilityBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      return r;
    }
  }
};

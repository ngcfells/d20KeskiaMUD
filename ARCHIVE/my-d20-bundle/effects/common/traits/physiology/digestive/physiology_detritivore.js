'use strict';

module.exports = {
  config: {
    name: "Physiology: Detritivore",
    description: "A physiology adapted to digest decaying organic matter.",
    type: "trait",
    family: "physiology_detritivore",
    unique: true,
    persists: true
  },

  state: {
    decayDigestBonus: +4,
    toxinResistBonus: +2,
    freshFoodPenalty: -2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.decayDigest === "number") r.decayDigest = current.decayDigest + state.decayDigestBonus;
      if (typeof current.toxinResist === "number") r.toxinResist = current.toxinResist + state.toxinResistBonus;
      if (typeof current.freshFoodDigest === "number") r.freshFoodDigest = current.freshFoodDigest + state.freshFoodPenalty;
      return r;
    }
  }
};

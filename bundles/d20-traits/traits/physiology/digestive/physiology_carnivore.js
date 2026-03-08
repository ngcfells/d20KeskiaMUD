'use strict';

module.exports = {
  config: {
    name: "Physiology: Carnivore",
    description: "A physiology adapted to digest meat and animal products exclusively.",
    type: "trait",
    family: "physiology_carnivore",
    unique: true,
    persists: true
  },

  state: {
    meatEfficiencyBonus: +3,
    plantDigestPenalty: -3,
    starvationRateBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.meatEfficiency === "number") r.meatEfficiency = current.meatEfficiency + state.meatEfficiencyBonus;
      if (typeof current.plantDigest === "number") r.plantDigest = current.plantDigest + state.plantDigestPenalty;
      if (typeof current.starvationRate === "number") r.starvationRate = current.starvationRate + state.starvationRateBonus;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Herbivore",
    description: "A physiology adapted to digest plant matter exclusively.",
    type: "trait",
    family: "physiology_herbivore",
    unique: true,
    persists: true
  },

  state: {
    plantEfficiencyBonus: +3,
    meatDigestPenalty: -3,
    fiberDigestBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.plantEfficiency === "number") r.plantEfficiency = current.plantEfficiency + state.plantEfficiencyBonus;
      if (typeof current.meatDigest === "number") r.meatDigest = current.meatDigest + state.meatDigestPenalty;
      if (typeof current.fiberDigest === "number") r.fiberDigest = current.fiberDigest + state.fiberDigestBonus;
      return r;
    }
  }
};

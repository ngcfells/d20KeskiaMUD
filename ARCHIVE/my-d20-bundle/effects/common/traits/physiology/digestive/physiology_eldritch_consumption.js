'use strict';

module.exports = {
  config: {
    name: "Physiology: Eldritch Consumption",
    description: "A physiology that feeds on entropy, madness, or non-Euclidean energy.",
    type: "trait",
    family: "physiology_eldritch_consumption",
    unique: true,
    persists: true
  },

  state: {
    entropyNutrientBonus: +5,
    foodRequirementReduction: +5,
    organicFoodPenalty: -5
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.entropyNutrient === "number") r.entropyNutrient = current.entropyNutrient + state.entropyNutrientBonus;
      if (typeof current.foodRequirement === "number") r.foodRequirement = Math.max(0, current.foodRequirement - state.foodRequirementReduction);
      if (typeof current.organicFoodDigest === "number") r.organicFoodDigest = current.organicFoodDigest + state.organicFoodPenalty;
      return r;
    }
  }
};

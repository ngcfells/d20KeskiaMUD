'use strict';

module.exports = {
  config: {
    name: "Physiology: Force Nutrient Exchange",
    description: "A physiology that sustains itself through the Force rather than food.",
    type: "trait",
    family: "physiology_force_nutrient_exchange",
    unique: true,
    persists: true
  },

  state: {
    foodRequirementReduction: +5,
    forceNutrientBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.foodRequirement === "number") r.foodRequirement = Math.max(0, current.foodRequirement - state.foodRequirementReduction);
      if (typeof current.forceNutrient === "number") r.forceNutrient = current.forceNutrient + state.forceNutrientBonus;
      return r;
    }
  }
};

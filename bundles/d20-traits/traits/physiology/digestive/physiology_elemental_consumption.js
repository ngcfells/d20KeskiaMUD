'use strict';

module.exports = {
  config: {
    name: "Physiology: Elemental Consumption",
    description: "A physiology that consumes elemental energy instead of organic nutrients.",
    type: "trait",
    family: "physiology_elemental_consumption",
    unique: true,
    persists: true
  },

  state: {
    elementalNutrientBonus: +5,
    foodRequirementReduction: +5,
    organicFoodImmunity: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.elementalNutrient === "number") r.elementalNutrient = current.elementalNutrient + state.elementalNutrientBonus;
      if (typeof current.foodRequirement === "number") r.foodRequirement = Math.max(0, current.foodRequirement - state.foodRequirementReduction);
      if (state.organicFoodImmunity) r.organicFoodImmunity = true;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Psionic Nutrient Exchange",
    description: "A physiology that absorbs nutrients through psionic field interaction.",
    type: "trait",
    family: "physiology_psionic_nutrient_exchange",
    unique: true,
    persists: true
  },

  state: {
    foodRequirementReduction: +4,
    psiNutrientBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.foodRequirement === "number") r.foodRequirement = Math.max(0, current.foodRequirement - state.foodRequirementReduction);
      if (typeof current.psiNutrient === "number") r.psiNutrient = current.psiNutrient + state.psiNutrientBonus;
      return r;
    }
  }
};

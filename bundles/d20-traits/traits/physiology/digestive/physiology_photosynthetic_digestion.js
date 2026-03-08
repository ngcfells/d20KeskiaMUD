'use strict';

module.exports = {
  config: {
    name: "Physiology: Photosynthetic Digestion",
    description: "A physiology that derives nutrients from sunlight and minimal soil intake.",
    type: "trait",
    family: "physiology_photosynthetic_digestion",
    unique: true,
    persists: true
  },

  state: {
    sunlightNutrientBonus: +4,
    soilMineralBonus: +2,
    foodRequirementReduction: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.sunlightNutrient === "number") r.sunlightNutrient = current.sunlightNutrient + state.sunlightNutrientBonus;
      if (typeof current.soilMineral === "number") r.soilMineral = current.soilMineral + state.soilMineralBonus;
      if (typeof current.foodRequirement === "number") r.foodRequirement = Math.max(0, current.foodRequirement - state.foodRequirementReduction);
      return r;
    }
  }
};

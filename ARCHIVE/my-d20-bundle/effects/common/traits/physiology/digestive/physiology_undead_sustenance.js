'use strict';

module.exports = {
  config: {
    name: "Physiology: Undead Sustenance",
    description: "A necrotic physiology that requires no organic food.",
    type: "trait",
    family: "physiology_undead_sustenance",
    unique: true,
    persists: true
  },

  state: {
    noFoodRequirement: true,
    necroticNutrientBonus: +4
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.noFoodRequirement) r.noFoodRequirement = true;
      if (typeof current.necroticNutrient === "number") r.necroticNutrient = current.necroticNutrient + state.necroticNutrientBonus;
      return r;
    }
  }
};

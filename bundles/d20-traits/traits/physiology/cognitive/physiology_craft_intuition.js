'use strict';

module.exports = {
  config: {
    name: "Physiology: Craft Intuition",
    description: "A cognitive pattern optimized for craftsmanship and material analysis.",
    type: "trait",
    family: "physiology_craft_intuition",
    unique: true,
    persists: true
  },

  state: {
    craftInsightBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.craftInsight === "number") r.craftInsight = current.craftInsight + state.craftInsightBonus;
      return r;
    }
  }
};

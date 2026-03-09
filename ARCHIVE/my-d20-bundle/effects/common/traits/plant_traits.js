'use strict';

module.exports = {
  config: {
    name: "Plant Traits",
    description: "Standard plant immunities and mechanical overrides.",
    type: "trait",
    family: "creature_trait_plant",
    unique: true,
    persists: true
  },

  state: {},

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const family = (effect.config.family || "").toLowerCase();

        const immuneFamilies = [
          "mind_affecting",
          "poison",
          "sleep",
          "paralysis",
          "stunning",
          "polymorph",
          "critical",
          "precision",
          "bleed"
        ];

        if (immuneFamilies.includes(family)) {
          result.cancel = true;
        }
      };
    },

    onIncomingCrit() {
      return data => {
        data.isCrit = false;
        data.multiplier = 1;
      };
    },

    onIncomingPrecisionDamage() {
      return data => {
        data.amount = 0;
      };
    }
  }
};

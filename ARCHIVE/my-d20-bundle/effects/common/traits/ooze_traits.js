'use strict';

module.exports = {
  config: {
    name: "Ooze Traits",
    description: "Standard ooze immunities and mechanical overrides.",
    type: "trait",
    family: "creature_trait_ooze",
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

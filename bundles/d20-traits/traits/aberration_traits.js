'use strict';

module.exports = {
  config: {
    name: "Aberration Traits",
    description: "Standard aberration resistances and immunities.",
    type: "trait",
    family: "creature_trait_aberration",
    unique: true,
    persists: true
  },

  state: {},

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const family = (effect.config.family || "").toLowerCase();

        const immuneFamilies = [
          "paralysis",
          "sleep",
          "polymorph"
        ];

        if (immuneFamilies.includes(family)) {
          result.cancel = true;
        }
      };
    }
  }
};

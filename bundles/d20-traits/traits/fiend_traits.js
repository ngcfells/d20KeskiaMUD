'use strict';

module.exports = {
  config: {
    name: "Fiend Traits",
    description: "Standard fiend immunities and resistances.",
    type: "trait",
    family: "creature_trait_fiend",
    unique: true,
    persists: true
  },

  state: {},

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const family = (effect.config.family || "").toLowerCase();

        const immuneFamilies = [
          "poison",
          "fear"
        ];

        if (immuneFamilies.includes(family)) {
          result.cancel = true;
        }
      };
    }
  }
};

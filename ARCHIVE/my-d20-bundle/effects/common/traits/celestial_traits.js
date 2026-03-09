'use strict';

module.exports = {
  config: {
    name: "Celestial Traits",
    description: "Standard celestial immunities and resistances.",
    type: "trait",
    family: "creature_trait_celestial",
    unique: true,
    persists: true
  },

  state: {},

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const family = (effect.config.family || "").toLowerCase();

        const immuneFamilies = [
          "disease",
          "poison",
          "death"
        ];

        if (immuneFamilies.includes(family)) {
          result.cancel = true;
        }
      };
    }
  }
};

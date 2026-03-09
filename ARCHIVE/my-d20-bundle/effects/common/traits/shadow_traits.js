'use strict';

module.exports = {
  config: {
    name: "Shadow Traits",
    description: "Standard shadow creature immunities and resistances.",
    type: "trait",
    family: "creature_trait_shadow",
    unique: true,
    persists: true
  },

  state: {},

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const family = (effect.config.family || "").toLowerCase();

        const immuneFamilies = [
          "fear",
          "cold_minor",
          "cold_major"
        ];

        if (immuneFamilies.includes(family)) {
          result.cancel = true;
        }
      };
    }
  }
};

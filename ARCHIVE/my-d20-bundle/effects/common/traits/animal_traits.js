'use strict';

module.exports = {
  config: {
    name: "Animal Traits",
    description: "Standard animal resistances and sensory bonuses.",
    type: "trait",
    family: "creature_trait_animal",
    unique: true,
    persists: true
  },

  state: {},

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const family = (effect.config.family || "").toLowerCase();

        const immuneFamilies = [
          "language_dependent",
          "complex_mind_affecting"
        ];

        if (immuneFamilies.includes(family)) {
          result.cancel = true;
        }
      };
    }
  },

  modifiers: {
    attributes(current) {
      return {
        perception: current.perception + 2
      };
    }
  }
};

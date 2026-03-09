'use strict';

module.exports = {
  config: {
    name: "Fey Traits",
    description: "Standard fey immunities and resistances.",
    type: "trait",
    family: "creature_trait_fey",
    unique: true,
    persists: true
  },

  state: {},

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const family = (effect.config.family || "").toLowerCase();

        const immuneFamilies = [
          "sleep",
          "charm"
        ];

        if (immuneFamilies.includes(family)) {
          result.cancel = true;
        }
      };
    }
  }
};

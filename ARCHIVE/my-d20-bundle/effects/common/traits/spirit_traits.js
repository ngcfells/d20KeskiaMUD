'use strict';

module.exports = {
  config: {
    name: "Spirit Traits",
    description: "Standard spirit immunities and incorporeal overrides.",
    type: "trait",
    family: "creature_trait_spirit",
    unique: true,
    persists: true
  },

  state: {},

  listeners: {
    onIncomingPhysicalDamage() {
      return data => {
        data.amount = Math.floor(data.amount / 2);
      };
    },

    onEffectAdd() {
      return (effect, result) => {
        const family = (effect.config.family || "").toLowerCase();

        if (family === "nonmagical_physical") {
          result.cancel = true;
        }
      };
    }
  }
};

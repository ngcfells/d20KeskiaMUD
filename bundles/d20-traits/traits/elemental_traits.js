'use strict';

module.exports = {
  config: {
    name: "Elemental Traits",
    description: "Standard elemental immunities and mechanical overrides.",
    type: "trait",
    family: "creature_trait_elemental",
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
          "sleep",
          "paralysis",
          "stunning",
          "disease",
          "death",
          "bleed",
          "fatigue",
          "exhaustion",
          "ability_damage",
          "ability_drain",
          "energy_drain",
          "nonlethal"
        ];

        if (immuneFamilies.includes(family)) {
          result.cancel = true;
          return;
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
    },

    onIncomingNonlethalDamage() {
      return data => {
        data.amount = 0;
      };
    }
  }
};

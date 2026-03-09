'use strict';

module.exports = {
  config: {
    name: "Construct Traits",
    description: "Standard construct immunities and mechanical overrides.",
    type: "trait",
    family: "creature_trait_construct",
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
          "disease",
          "paralysis",
          "sleep",
          "stunning",
          "death",
          "fear",
          "morale",
          "fatigue",
          "exhaustion",
          "bleed",
          "ability_damage",
          "ability_drain",
          "energy_drain",
          "nonlethal"
        ];

        if (immuneFamilies.includes(family)) {
          result.cancel = true;
          return;
        }

        const immuneFlags = [
          "isMindAffecting",
          "isPoison",
          "isDisease",
          "isParalysis",
          "isSleepEffect",
          "isStunning",
          "isDeathEffect",
          "isFearEffect",
          "isMoraleEffect"
        ];

        for (const flag of immuneFlags) {
          if (effect.config[flag]) {
            result.cancel = true;
            return;
          }
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
    },

    onSavingThrow() {
      return data => {
        if (data.type === "fortitude" && !data.effect?.config?.affectsObjects) {
          data.success = true;
          data.roll = 20;
        }
      };
    }
  }
};

'use strict';

/**
 * Undead Traits
 * Standard d20 undead immunities and mechanical overrides.
 */
module.exports = {
  config: {
    name: "Undead Traits",
    description: "Standard undead immunities and mechanical overrides.",
    type: "trait",
    family: "creature_trait_undead",
    unique: true,
    persists: true
  },

  state: {},

  listeners: {
    /**
     * Cancel incoming effects based on family or flags.
     */
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
          "energy_drain"
        ];

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

        if (immuneFamilies.includes(family)) {
          result.cancel = true;
          return;
        }

        for (const flag of immuneFlags) {
          if (effect.config[flag]) {
            result.cancel = true;
            return;
          }
        }
      };
    },

    /**
     * Undead cannot be critically hit.
     */
    onIncomingCrit() {
      return data => {
        data.isCrit = false;
        data.multiplier = 1;
      };
    },

    /**
     * Undead ignore precision damage (sneak attack, etc.)
     */
    onIncomingPrecisionDamage() {
      return data => {
        data.amount = 0;
      };
    },

    /**
     * Undead ignore nonlethal damage.
     */
    onIncomingNonlethalDamage() {
      return data => {
        data.amount = 0;
      };
    },

    /**
     * Undead automatically succeed Fortitude saves unless the effect affects objects.
     */
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

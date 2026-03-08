'use strict';

/**
 * Effect: Morale Bonus
 * A reusable morale-based enhancement to attacks and fear saves.
 */
module.exports = {
  config: {
    name: "Morale Bonus",
    description: "A morale-based enhancement improves combat performance and resistance to fear.",
    type: "buff",
    family: "affective_morale_bonus",
    tier: 1,
    maxTier: 5,
    unique: false,
    persists: false
  },

  state: {
    bonus: 1
  },

  modifiers: {
    attributes(current, state, trigger) {
      const result = {};

      // Attack bonus
      if (typeof current.hitRoll === "number") {
        result.hitRoll = current.hitRoll + state.bonus;
      }

      // Bonus to saves vs fear
      if (
        trigger &&
        trigger.descriptors &&
        trigger.descriptors.includes("fear") &&
        typeof current.will === "number"
      ) {
        result.will = current.will + state.bonus;
      }

      return result;
    }
  },

  listeners: {
    effectActivated() {
      this.target.say(`<cyan>Your combat performance improves slightly.</cyan>`);
    },

    effectDeactivated() {
      this.target.say(`<yellow>Your performance returns to normal levels.</yellow>`);
    },

    /**
     * Morale Bonus cancels Morale Penalty (Bane, etc.)
     */
    onEffectAdd() {
      return (incoming, result) => {
        const fam = (incoming.config.family || "").toLowerCase();

        if (fam === "affective_morale_penalty") {
          this.remove();
          incoming.remove();
          result.cancel = true;
        }
      };
    }
  }
};

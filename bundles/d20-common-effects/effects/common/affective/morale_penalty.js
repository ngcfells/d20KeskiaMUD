'use strict';

/**
 * Effect: Morale Penalty
 * A morale-based reduction to combat performance and resistance to fear.
 */
module.exports = {
  config: {
    name: "Morale Penalty",
    description: "A morale-based reduction weakens combat performance and resistance to fear.",
    type: "debuff",
    family: "affective_morale_penalty",
    tier: 1,
    maxTier: 5,
    unique: false,
    persists: false
  },

  state: {
    penalty: 1
  },

  modifiers: {
    attributes(current, state, trigger) {
      const result = {};

      // Penalty to attack rolls
      if (typeof current.hitRoll === "number") {
        result.hitRoll = current.hitRoll - state.penalty;
      }

      // Penalty to saves vs fear
      if (
        trigger &&
        trigger.descriptors &&
        trigger.descriptors.includes("fear") &&
        typeof current.will === "number"
      ) {
        result.will = current.will - state.penalty;
      }

      return result;
    }
  },

  listeners: {
    effectActivated() {
      this.target.say(`<yellow>Your combat performance decreases slightly.</yellow>`);
    },

    effectDeactivated() {
      this.target.say(`<cyan>Your performance returns to normal levels.</cyan>`);
    },

    /**
     * Morale Penalty cancels Morale Bonus.
     */
    onEffectAdd() {
      return (incoming, result) => {
        const fam = (incoming.config.family || "").toLowerCase();

        if (fam === "affective_morale_bonus") {
          this.remove();
          incoming.remove();
          result.cancel = true;
        }
      };
    }
  }
};

'use strict';

/**
 * Effect: Ability Reduction
 * One or more attributes are reduced by a targeted effect.
 */
module.exports = {
  config: {
    name: "Ability Reduction",
    description: "One or more attributes are reduced by a targeted effect.",
    type: "debuff",
    family: "ability_reduction",
    tier: 1,
    maxTier: 1,
    duration: 60000,
    unique: false,
    persists: false
  },

  /**
   * Spells or items should set:
   * state.attributes = {
   *   strength: -2,
   *   dexterity: -4,
   *   intelligence: -1,
   *   ...etc
   * }
   */
  state: {
    attributes: {
      strength: -2
    }
  },

  modifiers: {
    attributes(current, state) {
      const result = {};

      for (const [attr, penalty] of Object.entries(state.attributes)) {
        if (current[attr] !== undefined) {
          result[attr] = current[attr] + penalty;
        }
      }

      return result;
    }
  },

  listeners: {
    effectActivated() {
      const attrs = Object.entries(this.state.attributes)
        .map(([a, b]) => `${a} ${b}`)
        .join(', ');

      this.target.say(`<yellow>Your reduced attributes: ${attrs}.</yellow>`);
    },

    effectDeactivated() {
      this.target.say(`<cyan>Your attributes return to normal levels.</cyan>`);
    }
  }
};

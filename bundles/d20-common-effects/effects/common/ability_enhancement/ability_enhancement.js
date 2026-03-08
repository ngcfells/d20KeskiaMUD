'use strict';

/**
 * Effect: Ability Enhancement
 * One or more attributes are enhanced by a targeted effect.
 */
module.exports = {
  config: {
    name: "Ability Enhancement",
    description: "One or more attributes are enhanced by a targeted effect.",
    type: "buff",
    family: "ability_enhancement",
    tier: 1,
    maxTier: 1,
    duration: 60000,
    unique: false,
    persists: false
  },

  /**
   * Spells or items should set:
   * state.attributes = {
   *   strength: +4,
   *   dexterity: +2,
   *   intelligence: +1,
   *   ...etc
   * }
   */
  state: {
    attributes: {
      strength: 2
    }
  },

  modifiers: {
    attributes(current, state) {
      const result = {};

      // Apply each enhancement cleanly
      for (const [attr, bonus] of Object.entries(state.attributes)) {
        if (current[attr] !== undefined) {
          result[attr] = current[attr] + bonus;
        }
      }

      return result;
    }
  },

  listeners: {
    effectActivated() {
      const attrs = Object.entries(this.state.attributes)
        .map(([a, b]) => `${a} +${b}`)
        .join(', ');

      this.target.say(`<cyan>Your enhanced attributes: ${attrs}.</cyan>`);
    },

    effectDeactivated() {
      this.target.say(`<yellow>Your enhanced attributes return to normal levels.</yellow>`);
    }
  }
};

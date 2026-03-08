'use strict';

/**
 * Effect: Minor Energy Drain (Tier 1)
 * Negative energy weakens your vitality.
 */
module.exports = {
  config: {
    name: "Minor Energy Drain",
    description: "Negative energy weakens your vitality.",
    type: "condition",
    family: "energy_drain",
    tier: 1,
    maxTier: 3,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      maxHealth(current) {
        return Math.max(1, current - 5);
      },
      staminaRegen: -1,
      will: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>A faint negative energy drains your vitality.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The minor energy drain fades.</cyan>");
    }
  }
};

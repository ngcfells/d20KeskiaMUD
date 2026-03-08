'use strict';

/**
 * Effect: Major Energy Drain (Tier 2)
 * A strong negative energy force drains your life essence.
 */
module.exports = {
  config: {
    name: "Major Energy Drain",
    description: "A strong negative energy force drains your life essence.",
    type: "condition",
    family: "energy_drain",
    tier: 2,
    maxTier: 3,
    duration: 50000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      maxHealth(current) {
        return Math.max(1, current - 10);
      },
      staminaRegen: -2,
      will: -2,
      perception: -1,
      necroticResist: -2
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>A surge of negative energy drains your life force.</red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The major energy drain recedes.</cyan>");
    }
  }
};

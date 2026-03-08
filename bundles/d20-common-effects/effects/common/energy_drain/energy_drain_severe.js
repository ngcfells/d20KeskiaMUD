'use strict';

/**
 * Effect: Severe Energy Drain (Tier 3)
 * A severe negative energy force collapses your vitality and spiritual strength.
 */
module.exports = {
  config: {
    name: "Severe Energy Drain",
    description: "A severe negative energy force collapses your vitality and spiritual strength.",
    type: "condition",
    family: "energy_drain",
    tier: 3,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      maxHealth(current) {
        return Math.max(1, current - 20);
      },
      staminaRegen: -3,
      will: -3,
      perception: -2,
      necroticResist: -4,
      shadowResist: -3,
      sanity(current) {
        return current - 1;
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>A severe negative energy force collapses your vitality!</b></red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The severe energy drain weakens.</cyan>");
    }
  }
};

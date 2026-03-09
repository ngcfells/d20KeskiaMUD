'use strict';

/**
 * Effect: Force Burn (Tier 4)
 * A violent backlash from unstable Force manipulation.
 */
module.exports = {
  config: {
    name: "Force Burn",
    description: "A violent backlash scorches your connection to the Force.",
    type: "condition",
    family: "force",
    tier: 4,
    maxTier: 4,
    duration: 30000,
    unique: true,
    persists: false
  },

  state: {
    damageAmount: 2
  },

  modifiers: {
    attributes: {
      will(current) {
        return current - this.state.damageAmount;
      },
      wisdom(current) {
        return current - this.state.damageAmount;
      },
      forcePower(current) {
        return current - 2;
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>A violent Force backlash scorches your spirit!</b></red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your connection stabilizes.</cyan>");
    }
  }
};

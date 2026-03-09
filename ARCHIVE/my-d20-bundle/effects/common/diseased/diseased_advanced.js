'use strict';

/**
 * Effect: Diseased (Advanced, Tier 2)
 * A spreading infection disrupts your health and coordination.
 */
module.exports = {
  config: {
    name: "Diseased (Advanced)",
    description: "A spreading infection disrupts your health and coordination.",
    type: "condition",
    family: "diseased",
    tier: 2,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      constitution(current) {
        return current - 2;
      },
      staminaRegen: -2,
      perception: -2,
      reflex: -1,
      maxHealth(current) {
        return current - 5;
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>The infection spreads through your system.</red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The advanced infection weakens.</cyan>");
    }
  }
};

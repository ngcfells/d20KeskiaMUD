'use strict';

/**
 * Effect: Diseased (Mild, Tier 1)
 * A mild infection weakens your vitality.
 */
module.exports = {
  config: {
    name: "Diseased (Mild)",
    description: "A mild infection weakens your vitality.",
    type: "condition",
    family: "diseased",
    tier: 1,
    maxTier: 3,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      constitution(current) {
        return current - 1;
      },
      staminaRegen: -1,
      perception: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>A mild infection takes hold.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The mild infection fades.</cyan>");
    }
  }
};

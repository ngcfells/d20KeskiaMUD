'use strict';

/**
 * Effect: Diseased (Critical, Tier 3)
 * A severe infection ravages your body and threatens your stability.
 */
module.exports = {
  config: {
    name: "Diseased (Critical)",
    description: "A severe infection ravages your body and threatens your stability.",
    type: "condition",
    family: "diseased",
    tier: 3,
    maxTier: 3,
    duration: 90000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      constitution(current) {
        return current - 3;
      },
      staminaRegen: -3,
      perception: -3,
      reflex: -2,
      maxHealth(current) {
        return current - 10;
      },
      will(current) {
        return current - 1;
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>A severe infection ravages your body!</b></red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The critical infection recedes.</cyan>");
    }
  }
};

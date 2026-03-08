'use strict';

/**
 * Effect: Degenerating (Critical, Tier 3)
 * A severe degenerative effect rapidly breaks down tissue and vitality.
 */
module.exports = {
  config: {
    name: "Degenerating (Critical)",
    description: "A severe degenerative effect rapidly breaks down tissue and vitality.",
    type: "condition",
    family: "degenerating",
    tier: 3,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      healthRegen(current) {
        return current - 6;
      },
      staminaRegen(current) {
        return current - 3;
      },
      constitution(current) {
        return current - 2;
      },
      maxHealth(current) {
        return current - 5;
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>Your body begins to break down rapidly!</b></red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The critical degeneration weakens.</cyan>");
    }
  }
};

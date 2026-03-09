'use strict';

/**
 * Effect: Degenerating (Major, Tier 2)
 * A strong degenerative effect disrupts healing and vitality.
 */
module.exports = {
  config: {
    name: "Degenerating (Major)",
    description: "A strong degenerative effect disrupts healing and vitality.",
    type: "condition",
    family: "degenerating",
    tier: 2,
    maxTier: 3,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      healthRegen(current) {
        return current - 3;
      },
      staminaRegen(current) {
        return current - 2;
      },
      constitution(current) {
        return current - 1;
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Your vitality begins to break down.</red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The major degeneration subsides.</cyan>");
    }
  }
};

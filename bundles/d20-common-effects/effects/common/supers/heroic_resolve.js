'use strict';

/**
 * Effect: Heroic Resolve
 * A surge of determination enhances your resilience and focus.
 */
module.exports = {
  config: {
    name: "Heroic Resolve",
    description: "A surge of determination enhances your resilience and focus.",
    type: "condition",
    family: "supers_heroic_resolve",
    tier: 1,
    maxTier: 1,
    duration: 35000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      will: (c) => c + 2,
      reflex: (c) => c + 1,
      staminaRegen: (c) => c + 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<green>Your focus sharpens and your resilience strengthens.</green>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your resolve returns to normal levels.</cyan>");
    }
  }
};

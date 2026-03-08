'use strict';

/**
 * Effect: Force Sensitive
 * A latent connection to the Force. Hidden until relevant.
 */
module.exports = {
  config: {
    name: "Force Sensitive",
    description: "You possess a latent connection to the Force.",
    type: "condition",
    family: "force",
    tier: 0,
    maxTier: 0,
    duration: null,
    unique: true,
    persists: true
  },

  state: {},

  modifiers: {
    attributes: {
      perception: +1,
      will: +1,
      forcePower: +1
    }
  },

  listeners: {
    effectActivated() {
      // Hidden trait — do NOT announce unless revealed by realm rules
      this.target.setMeta('force_sensitive', true);
    },

    effectDeactivated() {
      this.target.setMeta('force_sensitive', false);
    }
  }
};

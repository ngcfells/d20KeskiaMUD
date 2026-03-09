'use strict';

/**
 * Effect: Light-Side Alignment (Tier 2)
 * You resonate with the Light Side of the Force.
 */
module.exports = {
  config: {
    name: "Light-Side Alignment",
    description: "You resonate with the Light Side of the Force.",
    type: "condition",
    family: "force",
    tier: 2,
    maxTier: 4,
    duration: 45000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: +3,
      will: +2,
      wisdom: +1,
      forcePower: +1,
      shadowResist: +2,
      corruptionResist: +1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<white>You feel clarity and calm as the Light Side surrounds you.</white>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The Light-Side resonance fades.</cyan>");
    }
  }
};

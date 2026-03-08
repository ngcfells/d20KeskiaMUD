'use strict';

/**
 * Effect: Neutral Force Alignment (Tier 2)
 * You resonate with the balanced, unpolarized aspect of the Force.
 */
module.exports = {
  config: {
    name: "Neutral Force Alignment",
    description: "You resonate with the balanced, unpolarized aspect of the Force.",
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
      perception: +2,
      will: +2,
      forcePower: +1,
      corruptionResist: +1,
      shadowResist: +1,
      sanity: (current) => current // neutral alignment does not affect sanity
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<cyan>You feel a calm, centered resonance with the Force.</cyan>");
    },

    effectDeactivated() {
      this.target.say("<yellow>The neutral resonance fades.</yellow>");
    }
  }
};

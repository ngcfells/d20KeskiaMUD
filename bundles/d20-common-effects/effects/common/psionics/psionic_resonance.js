'use strict';

/**
 * Effect: Psionic Resonance (Tier 1)
 * Your mind harmonizes with psionic energy, enhancing mental clarity.
 */
module.exports = {
  config: {
    name: "Psionic Resonance",
    description: "Your mind resonates with psionic energy, enhancing mental clarity.",
    type: "condition",
    family: "psionics",
    tier: 1,
    maxTier: 3,
    duration: 30000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      will: +2,
      intelligence: +1,
      psionicPower: +1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<magenta>Your thoughts hum with psionic resonance.</magenta>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The psionic resonance fades.</cyan>");
    }
  }
};

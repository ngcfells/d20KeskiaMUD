'use strict';

/**
 * Effect: Psionic Overload (Tier 2)
 * Unstable psionic amplification that strains the mind and body.
 */
module.exports = {
  config: {
    name: "Psionic Overload",
    description: "Unstable psionic amplification strains your mind and body.",
    type: "condition",
    family: "psionics",
    tier: 2,
    maxTier: 3,
    duration: 20000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      psionicPower: +3,
      will: +1,
      reflex: -2,
      staminaRegen: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your psionic energy surges beyond safe limits.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The overload subsides.</cyan>");
    },

    damaged() {
      this.target.say("<red>The psionic overload destabilizes!</red>");
      this.target.addEffect?.("Psionic Burn");
      this.remove();
    }
  }
};

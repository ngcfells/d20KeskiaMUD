'use strict';

/**
 * Effect: Force Overload (Tier 3)
 * Unstable Force amplification that strains body and mind.
 */
module.exports = {
  config: {
    name: "Force Overload",
    description: "Unstable Force amplification strains your body and mind.",
    type: "condition",
    family: "force",
    tier: 3,
    maxTier: 4,
    duration: 20000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      forcePower: +3,
      will: +1,
      reflex: -2,
      staminaRegen: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>The Force surges beyond safe limits!</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The overload subsides.</cyan>");
    },

    damaged() {
      this.target.say("<red>The Force overload destabilizes!</red>");
      this.target.addEffect?.("Force Burn");
      this.remove();
    }
  }
};

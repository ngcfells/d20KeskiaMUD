'use strict';

module.exports = {
  config: {
    name: "Fatigued",
    description: "Your muscles feel heavy. Minor penalties to stamina recovery and physical performance.",
    type: "condition",
    family: "fatigue",
    tier: 1,
    maxTier: 3,
    duration: 30000
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: -1,
      strength: -1,
      dexterity: -1,
      reflex: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>A sluggish heaviness settles into your limbs.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your muscles regain some strength.</cyan>");
    }
  }
};

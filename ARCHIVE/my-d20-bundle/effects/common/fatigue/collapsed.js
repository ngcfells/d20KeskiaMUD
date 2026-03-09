'use strict';

module.exports = {
  config: {
    name: "Collapsed",
    description: "Your body can barely continue. Severe penalties to stamina, strength, and reflexes.",
    type: "condition",
    family: "fatigue",
    tier: 3,
    maxTier: 3,
    duration: 60000
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: -3,
      strength: -4,
      dexterity: -3,
      reflex: -3,
      will: -2,
      speed: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Your body falters under overwhelming fatigue.</red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your strength slowly returns.</cyan>");
    }
  }
};

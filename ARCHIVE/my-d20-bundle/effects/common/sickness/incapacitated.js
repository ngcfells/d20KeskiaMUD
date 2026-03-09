'use strict';

module.exports = {
  config: {
    name: "Incapacitated",
    description: "Your body is overwhelmed by sickness. Severe penalties to stamina, strength, and coordination.",
    type: "condition",
    family: "sickness",
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
      will: -3,
      perception: -2,
      speed: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Your body buckles under overwhelming sickness.</red>");
      this.target.setMeta('incapacitated_override', true);
    },

    effectDeactivated() {
      this.target.say("<cyan>Your strength slowly returns.</cyan>");
      this.target.setMeta('incapacitated_override', false);
    }
  }
};

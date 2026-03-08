'use strict';

module.exports = {
  config: {
    name: "Nauseous",
    description: "Your body rebels against internal distress. Noticeable penalties to stamina, strength, and focus.",
    type: "condition",
    family: "sickness",
    tier: 2,
    maxTier: 3,
    duration: 45000
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: -2,
      strength: -2,
      dexterity: -2,
      will: -2,
      perception: -1,
      reflex: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<magenta>A wave of nausea grips your body.</magenta>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your body steadies.</cyan>");
    }
  }
};

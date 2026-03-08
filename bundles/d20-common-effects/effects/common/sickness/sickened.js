'use strict';

module.exports = {
  config: {
    name: "Sickened",
    description: "A wave of discomfort unsettles your body. Minor penalties to stamina and physical performance.",
    type: "condition",
    family: "sickness",
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
      will: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>A queasy discomfort churns in your gut.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your stomach settles.</cyan>");
    }
  }
};

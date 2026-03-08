'use strict';

module.exports = {
  config: {
    name: "Exhausted",
    description: "Your body strains under fatigue. Noticeable penalties to stamina, strength, and reflexes.",
    type: "condition",
    family: "fatigue",
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
      reflex: -2,
      will: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<magenta>Your movements slow as fatigue weighs heavily on you.</magenta>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your stamina begins to return.</cyan>");
    }
  }
};

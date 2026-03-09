'use strict';

module.exports = {
  config: {
    name: "Desolate",
    description: "Your inner drive falters. Severe penalties to will, perception, and stamina recovery.",
    type: "condition",
    family: "affective",
    tier: 3,
    maxTier: 3,
    duration: 60000
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: -3,
      perception: -3,
      will: -4,
      skill: -2,
      reflex: -1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<red>Your inner drive thins to a fragile thread.</red>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>A faint spark of clarity returns.</cyan>");
    }
  }
};

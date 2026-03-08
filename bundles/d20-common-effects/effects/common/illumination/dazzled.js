'use strict';

module.exports = {
  config: {
    name: "Dazzled",
    description: "Bright light disrupts your vision. Minor penalties to perception and accuracy.",
    type: "condition",
    family: "illumination",
    tier: 1,
    maxTier: 3,
    duration: 20000
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -2,
      attack: -1,
      reflex: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Bright light washes across your vision.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your sight adjusts to the light.</cyan>");
    }
  }
};

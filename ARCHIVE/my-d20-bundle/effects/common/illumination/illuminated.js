'use strict';

module.exports = {
  config: {
    name: "Illuminated",
    description: "Intense light overwhelms your senses. Noticeable penalties to perception, accuracy, and reaction time.",
    type: "condition",
    family: "illumination",
    tier: 2,
    maxTier: 3,
    duration: 30000
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -3,
      attack: -2,
      reflex: -2,
      will: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<magenta>Intense radiance floods your vision.</magenta>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The overwhelming glare fades.</cyan>");
    }
  }
};

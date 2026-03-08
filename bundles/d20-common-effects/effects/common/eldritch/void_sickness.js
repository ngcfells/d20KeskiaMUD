'use strict';

/**
 * Effect: Void Sickness
 * Exposure to void energies disrupts your physical and cognitive stability.
 */
module.exports = {
  config: {
    name: "Void Sickness",
    description: "Exposure to void energies disrupts your physical and cognitive stability.",
    type: "condition",
    family: "eldritch_void",
    tier: 1,
    maxTier: 1,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      constitution: (c) => c - 2,
      perception: (c) => c - 2,
      staminaRegen: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Unstable void energies disrupt your form.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The void\'s influence loosens.</cyan>");
    }
  }
};

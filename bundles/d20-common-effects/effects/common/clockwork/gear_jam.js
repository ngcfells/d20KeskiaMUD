'use strict';

/**
 * Effect: Gear Jam
 * Mechanical components seize or misalign, reducing efficiency.
 */
module.exports = {
  config: {
    name: "Gear Jam",
    description: "Mechanical components seize or misalign, reducing efficiency.",
    type: "condition",
    family: "clockwork_gear_jam",
    tier: 1,
    maxTier: 1,
    duration: 20000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      reflex: (c) => c - 2,
      strength: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Your mechanical components seize momentarily.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The jam clears.</cyan>");
    }
  }
};

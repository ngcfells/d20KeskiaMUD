'use strict';

/**
 * Effect: Shadow Chill (Tier 1)
 * A faint chill of shadow energy weakens your senses.
 */
module.exports = {
  config: {
    name: "Shadow Chill",
    description: "A faint chill of shadow energy weakens your senses.",
    type: "condition",
    family: "shadow",
    tier: 1,
    maxTier: 3,
    duration: 30000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -1,
      will: -1,
      coldResist: -1,
      necroticResist: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<blue>A faint chill of shadow creeps over you.</blue>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The shadow chill fades.</cyan>");
    }
  }
};

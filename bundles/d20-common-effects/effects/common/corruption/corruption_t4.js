'use strict';

module.exports = {
  config: {
    name: "Corruption IV",
    description: "A severe metaphysical withering hollows your spirit.",
    type: "condition",
    family: "corruption",
    tier: 4,
    maxTier: 5,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      will: -4,
      perception: -4,
      sanity: (current) => current - 4,
      necroticResist: -3,
      shadowResist: -3,
      forcePower: -2,
      psionicPower: -2,
      charisma: -2
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>A severe corruption hollows your inner being.</red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The withering weakens.</cyan>");
    }
  }
};

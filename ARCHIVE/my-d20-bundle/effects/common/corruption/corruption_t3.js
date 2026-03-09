'use strict';

module.exports = {
  config: {
    name: "Corruption III",
    description: "A metaphysical blight gnaws at your spirit.",
    type: "condition",
    family: "corruption",
    tier: 3,
    maxTier: 5,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      will: -3,
      perception: -3,
      sanity: (current) => current - 3,
      necroticResist: -2,
      shadowResist: -2,
      forcePower: -1,
      psionicPower: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>A metaphysical blight gnaws at your spirit.</red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The blight recedes slightly.</cyan>");
    }
  }
};

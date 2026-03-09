'use strict';

module.exports = {
  config: {
    name: "Corruption V",
    description: "A catastrophic metaphysical corruption threatens to unravel your essence.",
    type: "condition",
    family: "corruption",
    tier: 5,
    maxTier: 5,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      will: -6,
      perception: -6,
      sanity: (current) => current - 6,
      necroticResist: -5,
      shadowResist: -5,
      forcePower: -3,
      psionicPower: -3,
      charisma: -4,
      constitution: -2
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>A catastrophic corruption threatens to unravel your essence.</b></red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The catastrophic corruption recedes.</cyan>");
    }
  }
};

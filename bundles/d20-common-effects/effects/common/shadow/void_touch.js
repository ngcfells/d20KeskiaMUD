'use strict';

/**
 * Effect: Void Touch (Tier 3)
 * A deep void corruption drains vitality and spiritual strength.
 */
module.exports = {
  config: {
    name: "Void Touch",
    description: "A deep void corruption drains vitality and spiritual strength.",
    type: "condition",
    family: "shadow",
    tier: 3,
    maxTier: 3,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -4,
      will: -3,
      coldResist: -5,
      necroticResist: -5,
      sanity: (current) => current - 2,
      maxHealth: (current) => current - 10,
      staminaRegen: -2,
      forcePower: -1,
      psionicPower: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>A void-born corruption seeps into your essence.</red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The void touch withdraws.</cyan>");
    }
  }
};

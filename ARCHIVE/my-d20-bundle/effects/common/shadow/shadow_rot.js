'use strict';

/**
 * Effect: Shadow Rot (Tier 2)
 * Shadow energies rot your vitality and weaken your defenses.
 */
module.exports = {
  config: {
    name: "Shadow Rot",
    description: "Shadow energies rot your vitality and weaken your defenses.",
    type: "condition",
    family: "shadow",
    tier: 2,
    maxTier: 3,
    duration: 40000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -2,
      will: -2,
      coldResist: -3,
      necroticResist: -3,
      staminaRegen: -1,
      maxHealth: (current) => current - 5
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<blue>Shadow rot gnaws at your vitality.</blue>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The shadow rot recedes.</cyan>");
    }
  }
};

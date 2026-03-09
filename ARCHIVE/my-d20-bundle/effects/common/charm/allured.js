'use strict';

module.exports = {
  config: {
    name: "Allured",
    description: "A compelling presence draws your attention. Noticeable bonuses to charisma and appearance.",
    type: "condition",
    family: "charm",
    tier: 2,
    maxTier: 3,
    duration: 45000,
    sourceType: "arcane"
  },

  state: {},

  modifiers: {
    attributes: {
      charisma: +2,
      appearance: +2,
      will: -2,
      perception: -2,
      skill: +1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your attention narrows toward a compelling presence.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your awareness broadens again.</cyan>");
    }
  }
};

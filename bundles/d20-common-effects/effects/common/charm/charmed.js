'use strict';

module.exports = {
  config: {
    name: "Charmed",
    description: "Your guard softens. Minor bonuses to charisma and appearance, with reduced resistance to influence.",
    type: "condition",
    family: "charm",
    tier: 1,
    maxTier: 3,
    duration: 30000,
    sourceType: "arcane" // default; can be overridden by the effect applier
  },

  state: {},

  modifiers: {
    attributes: {
      charisma: +1,
      appearance: +1,
      will: -1,
      perception: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your guard eases slightly.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your sense of caution returns.</cyan>");
    }
  }
};

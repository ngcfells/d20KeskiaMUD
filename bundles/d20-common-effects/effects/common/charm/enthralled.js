'use strict';

module.exports = {
  config: {
    name: "Enthralled",
    description: "A compelling presence holds your focus. Noticeable penalties to perception, will, and critical reasoning.",
    type: "condition",
    family: "enthrall",
    tier: 2,
    maxTier: 3,
    duration: 45000,
    sourceType: "arcane"
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -3,
      will: -2,
      skill: -2,
      intelligence: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<magenta>Your thoughts circle around a compelling presence.</magenta>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The mental pull weakens.</cyan>");
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Hypersurge",
    description: "Your mind races beyond control. Strong bonuses to initiative and reflex, but severe penalties to will and perception.",
    type: "condition",
    family: "affective",
    tier: 3,
    maxTier: 3,
    duration: 60000
  },

  state: {},

  modifiers: {
    attributes: {
      initiative: +4,
      reflex: +3,
      attack: +2,
      will: -4,
      perception: -3,
      corruption: +1 // optional synergy
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<red>Your thoughts surge in a blinding rush of momentum.</red>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>The overwhelming rush finally ebbs.</cyan>");
    }
  }
};

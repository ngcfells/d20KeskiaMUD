'use strict';

module.exports = {
  config: {
    name: "Manic",
    description: "Your thoughts race. Noticeable bonuses to initiative and attack, but reduced discipline.",
    type: "condition",
    family: "affective",
    tier: 2,
    maxTier: 3,
    duration: 45000
  },

  state: {},

  modifiers: {
    attributes: {
      initiative: +2,
      attack: +1,
      reflex: +1,
      will: -2,
      perception: -1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<yellow>Your thoughts accelerate into a rapid rhythm.</yellow>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>Your thoughts slow to a steadier pace.</cyan>");
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Battle Trance",
    description: "Instinct sharpens your reactions. You act with heightened focus but reduced awareness.",
    type: "condition",
    family: "loss_of_control",
    tier: 1,
    maxTier: 3,
    duration: 30000
  },

  state: {},

  modifiers: {
    attributes: {
      attack: +2,
      reflex: +1,
      perception: -2,
      will: -1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<yellow>Your senses narrow into a focused rhythm.</yellow>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>The trance loosens its hold on your awareness.</cyan>");
    }
  }
};

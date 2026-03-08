'use strict';

module.exports = {
  config: {
    name: "Livid",
    description: "Your temper rises. Noticeable boost to melee accuracy, but focus suffers.",
    type: "condition",
    family: "anger",
    tier: 2,
    maxTier: 4,
    duration: 30000 // 30s
  },

  state: {},

  modifiers: {
    attributes: {
      attack: +2,
      damage: +1,
      will: -2,
      skill: -2,
      reflex: -1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<yellow>Your pulse quickens as your temper sharpens.</yellow>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>Your breathing steadies as the heat subsides.</cyan>");
    }
  }
};

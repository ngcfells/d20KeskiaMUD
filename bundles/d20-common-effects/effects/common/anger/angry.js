'use strict';

module.exports = {
  config: {
    name: "Angry",
    description: "Irritation sharpens your movements. Minor bonuses to melee accuracy but reduced discipline.",
    type: "condition",
    family: "anger",
    tier: 1,
    maxTier: 4,
    duration: 20000 // 20s
  },

  state: {},

  modifiers: {
    attributes: {
      attack: +1,
      will: -1,
      skill: -1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<yellow>A spark of irritation tightens your stance.</yellow>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>Your posture eases as the tension fades.</cyan>");
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Frenzied",
    description: "A burst of reckless ferocity. Powerful melee bonuses but severely reduced defenses.",
    type: "condition",
    family: "anger",
    tier: 4,
    maxTier: 4,
    duration: 50000 // 50s
  },

  state: {},

  modifiers: {
    attributes: {
      attack: +4,
      damage: +3,
      will: -4,
      reflex: -3,
      armorKinetic: -2,
      armorEnergy: -2,
      perception: -3
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<red>Your movements surge with reckless intensity.</red>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>The reckless momentum drains from your limbs.</cyan>");
    }
  }
};

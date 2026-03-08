'use strict';

module.exports = {
  config: {
    name: "Enraged",
    description: "Aggression surges. Strong boost to melee output, but defenses falter.",
    type: "condition",
    family: "anger",
    tier: 3,
    maxTier: 4,
    duration: 40000 // 40s
  },

  state: {},

  modifiers: {
    attributes: {
      attack: +3,
      damage: +2,
      will: -3,
      reflex: -2,
      armorKinetic: -1,
      armorEnergy: -1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<red>A surge of raw aggression tightens every muscle.</red>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>The surge ebbs, leaving your stance more controlled.</cyan>");
    }
  }
};

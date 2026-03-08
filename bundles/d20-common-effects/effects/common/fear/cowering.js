'use strict';

module.exports = {
  config: {
    name: "Cowering",
    description: "Fear peaks into paralysis of action. Severe penalties to defense and awareness.",
    type: "condition",
    family: "fear",
    tier: 5,
    maxTier: 5,
    duration: 60000 // 60s
  },

  state: {},

  modifiers: {
    attributes: {
      attack: -5,
      skill: -5,
      fortitude: -4,
      reflex: -4,
      will: -5,
      armorKinetic: -2,
      perception: -4
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<red>A crushing wave of fear locks your muscles in place.</red>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>The paralysis loosens as the fear finally breaks.</cyan>");
    }
  }
};

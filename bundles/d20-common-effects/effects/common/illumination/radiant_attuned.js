'use strict';

module.exports = {
  config: {
    name: "Radiant Attuned",
    description: "Your senses resonate with intense radiance. Severe penalties to perception and accuracy, with minor bonuses to resisting shadow effects.",
    type: "condition",
    family: "illumination",
    tier: 3,
    maxTier: 3,
    duration: 40000
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -4,
      attack: -3,
      reflex: -2,
      shadowResist: +2 // optional cross-family synergy
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Your senses resonate with overwhelming radiance.</red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The radiant intensity finally subsides.</cyan>");
    }
  }
};

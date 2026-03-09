'use strict';

module.exports = {
  config: {
    name: "Stunned",
    description: "Your mind locks up under overwhelming disruption. Severe penalties to perception, will, and reaction.",
    type: "condition",
    family: "mental_disruption",
    tier: 3,
    maxTier: 3,
    duration: 40000
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -5,
      will: -4,
      reflex: -4,
      intelligence: -3,
      skill: -2
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Your thoughts freeze under a crushing mental shock.</red>");
      this.target.setMeta('stunned_override', true);
    },

    effectDeactivated() {
      this.target.say("<cyan>Your awareness slowly returns.</cyan>");
      this.target.setMeta('stunned_override', false);
    }
  }
};

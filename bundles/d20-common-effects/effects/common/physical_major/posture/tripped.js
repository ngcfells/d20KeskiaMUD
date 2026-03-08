'use strict';

/**
 * Effect: Tripped
 * A forced knockdown event. After the brief stagger, the target becomes Prone unless prevented.
 */
module.exports = {
  config: {
    name: "Tripped",
    description: "You are knocked off your feet and will fall prone unless you recover quickly.",
    type: "condition",
    family: "physical_major_posture",
    tier: 1,
    maxTier: 1,
    duration: 5000, // 5 seconds
    unique: true,
    persists: false
  },

  state: {},

  listeners: {
    effectActivated() {
      const target = this.target;

      target.setMeta('tripped_override', true);
      target.addTag?.('is_tripped');

      target.say("<red>You stumble as your legs are swept out from under you!</red>");
    },

    effectDeactivated() {
      const target = this.target;

      target.setMeta('tripped_override', false);
      target.removeTag?.('is_tripped');

      target.say("<cyan>You hit the ground.</cyan>");

      // Automatically apply Prone unless already prone or immune
      if (!target.hasEffect?.("Prone")) {
        target.addEffect?.("Prone");
      }
    }
  }
};

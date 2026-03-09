'use strict';

module.exports = {
  config: {
    name: "Acquiescent",
    description: "You are dazed and compliant, unable to act.",
    type: "condition",
    family: "charm",
    tier: 2,
    duration: 6000
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      target.addTag('dazed');
      target.addTag('is_willing'); // Critical for follow-up spells like 'Teleport' or 'Plane Shift'
    },

    /**
     * Prevent all actions while dazed
     */
    onBeforeAction() {
      this.target.say("<yellow>You are too peaceful and compliant to do that right now.</yellow>");
      return false;
    },

    effectDeactivated() {
      const target = this.target;
      target.removeTag('dazed');
      target.removeTag('is_willing');
      target.say("<cyan>Your sense of agency returns with a sudden, jarring snap.</cyan>");
    }
  }
};

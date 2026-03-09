'use strict';

/**
 * Effect: Aging Transition
 * Logic: Halves movement, attacks, and HD effectiveness during the aging process.
 */
module.exports = {
  config: {
    name: "Temporal Flux",
    description: "Your physical form is currently undergoing rapid temporal shift.",
    type: "condition",
    family: "time",
    tier: 3,
    duration: 60000
  },

  modifiers: {
    attributes: {
      // 2E Logic: Half ability
      speed: (curr) => Math.floor(curr / 2),
      attack: -4, // Representing half Hit Dice efficacy
      armorKinetic: -2
    }
  },

  listeners: {
    effectActivated() {
      this.target.addTag('staggered');
      this.target.say("<yellow>You feel nauseous as your bones lengthen and your muscles thicken unnaturally fast.</yellow>");
    },

    effectDeactivated() {
      this.target.removeTag('staggered');
      this.target.say("<bold><green>The temporal transition is complete. You have reached your new age.</green></bold>");
    }
  }
};

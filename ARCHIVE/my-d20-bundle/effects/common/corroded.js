'use strict';

/**
 * Effect: Corroded
 * Acid or corrosive agents weaken your defenses.
 */
module.exports = {
  config: {
    name: "Corroded",
    description: "Corrosive damage weakens your armor and defenses.",
    type: "condition",
    family: "corrosion",
    tier: 1,
    maxTier: 3,
    duration: 20000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      armorKinetic: (current) => current - 2,
      armorEnergy: (current) => current - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your armor sizzles under corrosive damage.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The corrosion stops spreading.</cyan>");
    }
  }
};

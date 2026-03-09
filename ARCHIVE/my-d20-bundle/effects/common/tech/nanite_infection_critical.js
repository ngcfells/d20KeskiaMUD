'use strict';

/**
 * Effect: Nanite Infection (Critical)
 * Severe nanite malfunction threatens systemic collapse.
 */
module.exports = {
  config: {
    name: "Nanite Infection (Critical)",
    description: "Severe nanite malfunction threatens systemic collapse.",
    type: "condition",
    family: "tech_nanite_infection",
    tier: 3,
    maxTier: 3,
    duration: 90000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      constitution: (c) => c - 3,
      staminaRegen: (c) => c - 3,
      perception: (c) => c - 2,
      maxHealth: (c) => c - 5
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>Nanite malfunction reaches critical levels!</b></red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The critical nanite disruption recedes.</cyan>");
    }
  }
};

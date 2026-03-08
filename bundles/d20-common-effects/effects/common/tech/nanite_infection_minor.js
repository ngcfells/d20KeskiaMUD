'use strict';

/**
 * Effect: Nanite Infection (Minor)
 * Malfunctioning nanites disrupt basic biological processes.
 */
module.exports = {
  config: {
    name: "Nanite Infection (Minor)",
    description: "Malfunctioning nanites disrupt basic biological processes.",
    type: "condition",
    family: "tech_nanite_infection",
    tier: 1,
    maxTier: 3,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      constitution: (c) => c - 1,
      staminaRegen: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Nanite malfunction disrupts your system.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The minor nanite disruption fades.</cyan>");
    }
  }
};

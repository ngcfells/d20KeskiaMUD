'use strict';

/**
 * Effect: Nanite Infection (Major)
 * Aggressive nanite malfunction disrupts vital processes.
 */
module.exports = {
  config: {
    name: "Nanite Infection (Major)",
    description: "Aggressive nanite malfunction disrupts vital processes.",
    type: "condition",
    family: "tech_nanite_infection",
    tier: 2,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      constitution: (c) => c - 2,
      staminaRegen: (c) => c - 2,
      perception: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Nanite malfunction spreads through your system.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The major nanite disruption weakens.</cyan>");
    }
  }
};

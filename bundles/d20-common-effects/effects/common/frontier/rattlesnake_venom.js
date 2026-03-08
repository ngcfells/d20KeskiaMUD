'use strict';

/**
 * Effect: Rattlesnake Venom
 * A venomous bite disrupts circulation and stamina.
 */
module.exports = {
  config: {
    name: "Rattlesnake Venom",
    description: "A venomous bite disrupts circulation and stamina.",
    type: "condition",
    family: "frontier_rattlesnake_venom",
    tier: 1,
    maxTier: 1,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      constitution: c => c - 2,
      staminaRegen: c => c - 2,
      reflex: c => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Venom disrupts your circulation.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The venom’s effects fade.</cyan>");
    }
  }
};

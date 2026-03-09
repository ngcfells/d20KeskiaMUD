'use strict';

/**
 * Effect: Ritual
 * You perform a long-form magical or supernatural ritual.
 */
module.exports = {
  config: {
    name: "Ritual",
    description: "You perform a long-form magical or supernatural ritual.",
    type: "condition",
    family: "physical_major_activity",
    tier: 1,
    maxTier: 1,
    duration: null,
    unique: true,
    persists: false
  },

  state: {
    progress: 0
  },

  modifiers: {
    attributes: {
      spellPower: +3,
      will: +1,
      reflex: -3,
      speed: -2
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('ritual_override', true);
      this.target.addTag?.('is_in_ritual');
      this.target.say("<yellow>You begin a complex ritual...</yellow>");
    },

    effectDeactivated() {
      this.target.setMeta('ritual_override', false);
      this.target.removeTag?.('is_in_ritual');
      this.target.say("<cyan>Your ritual ends.</cyan>");
    },

    updateTick() {
      this.state.progress++;
      if (this.state.progress % 10 === 0) {
        this.target.say("<magenta>The ritual energies build...</magenta>");
      }
    },

    move() {
      this.target.say("You cannot move during a ritual!");
      return false;
    },

    damaged() {
      this.target.say("<red>Your ritual collapses!</red>");
      this.remove();
    }
  }
};

'use strict';

const TrainingLogic = require('../../../../lib/d20/training-logic');

/**
 * Effect: Meditating
 * Deep mental focus. Grants mental bonuses and attribute practice over time.
 */
module.exports = {
  config: {
    name: "Meditating",
    description: "You are in deep meditation, focusing your mental energies.",
    type: "condition",
    family: "physical_major_activity",
    tier: 1,
    maxTier: 1,
    duration: null, // lasts until broken
    unique: true,
    persists: false
  },

  state: {
    success: false,
    tickCount: 0
  },

  modifiers: {
    attributes: {
      will(current) { return this.state.success ? current + 2 : current; },
      intelligence(current) { return this.state.success ? current + 1 : current; }
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('meditating_override', true);
      this.target.addTag?.('is_meditating');
      this.target.say("<magenta>You close your eyes and seek inner stillness.</magenta>");
    },

    effectDeactivated() {
      this.target.setMeta('meditating_override', false);
      this.target.removeTag?.('is_meditating');
      this.target.say("<cyan>Your meditation ends.</cyan>");
    },

    updateTick() {
      if (!this.state.success) return;

      this.state.tickCount++;
      if (this.state.tickCount >= 5) {
        this.state.tickCount = 0;
        const attr = Math.random() > 0.5 ? 'intelligence' : 'wisdom';
        TrainingLogic.practice(this.target, 'attributes', attr, 10);
      }
    },

    move(exit) {
      this.target.say("You break your concentration by trying to move.");
      this.remove();
      return true;
    },

    damaged(damage) {
      this.target.say("<red>Your concentration shatters!</red>");
      this.remove();
    }
  }
};

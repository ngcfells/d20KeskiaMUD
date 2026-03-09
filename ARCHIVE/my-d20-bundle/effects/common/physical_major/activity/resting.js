'use strict';

/**
 * Effect: Resting
 * You sit or lie down to rest. Movement is blocked; stamina regen is improved.
 */
module.exports = {
  config: {
    name: "Resting",
    description: "You are resting, doubling your stamina recovery but unable to move.",
    type: "condition",
    family: "physical_major_activity",
    tier: 1,
    maxTier: 1,
    duration: null, // lasts until canceled
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: (current) => current * 2
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('resting_override', true);
      this.target.addTag?.('is_resting');
      this.target.say("<green>You sit down and begin to rest.</green>");
    },

    effectDeactivated() {
      this.target.setMeta('resting_override', false);
      this.target.removeTag?.('is_resting');
      this.target.say("<yellow>You stand up, feeling refreshed.</yellow>");
    },

    move(exit) {
      this.target.say("You are resting! You must stand up first (type 'rest' again).");
      return false;
    },

    damaged(damage) {
      this.target.say("<red>Your rest is violently interrupted!</red>");
      this.remove();
    }
  }
};

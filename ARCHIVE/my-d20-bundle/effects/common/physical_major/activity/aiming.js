'use strict';

/**
 * Effect: Aiming
 * You take careful aim, improving ranged accuracy but restricting movement.
 */
module.exports = {
  config: {
    name: "Aiming",
    description: "You take careful aim, improving ranged accuracy but restricting movement.",
    type: "condition",
    family: "physical_major_activity",
    tier: 1,
    maxTier: 1,
    duration: null,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      attackRanged: +3,
      perception: +1,
      reflex: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('aiming_override', true);
      this.target.addTag?.('is_aiming');
      this.target.say("<yellow>You steady your aim.</yellow>");
    },

    effectDeactivated() {
      this.target.setMeta('aiming_override', false);
      this.target.removeTag?.('is_aiming');
      this.target.say("<cyan>You lower your aim.</cyan>");
    },

    move() {
      this.target.say("You stop aiming as you move.");
      this.remove();
      return true;
    },

    damaged() {
      this.target.say("<red>Your aim is disrupted!</red>");
      this.remove();
    }
  }
};

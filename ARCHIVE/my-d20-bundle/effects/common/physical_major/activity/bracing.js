'use strict';

/**
 * Effect: Bracing
 * You brace yourself to resist knockback and physical force.
 */
module.exports = {
  config: {
    name: "Bracing",
    description: "You brace yourself to resist knockback and physical force.",
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
      strength: +2,
      reflex: +1,
      knockbackResist: +3
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('bracing_override', true);
      this.target.addTag?.('is_bracing');
      this.target.say("<green>You brace yourself firmly.</green>");
    },

    effectDeactivated() {
      this.target.setMeta('bracing_override', false);
      this.target.removeTag?.('is_bracing');
      this.target.say("<cyan>You relax your stance.</cyan>");
    },

    move() {
      this.target.say("You stop bracing as you move.");
      this.remove();
      return true;
    }
  }
};

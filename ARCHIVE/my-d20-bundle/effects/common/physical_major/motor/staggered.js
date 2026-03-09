'use strict';

/**
 * Effect: Staggered
 * You can only take a single move OR standard action.
 * Penalties to reflex, dexterity, and attack.
 */
module.exports = {
  config: {
    name: "Staggered",
    description: "You struggle to maintain control of your movements.",
    type: "condition",
    family: "physical_major_motor",
    tier: 1,
    maxTier: 1,
    duration: 8000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      reflex: -2,
      dexterity: -1,
      attack: -1
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;

      target.setMeta('staggered_override', true);
      target.addTag?.('is_staggered');

      target.say("<yellow>Your balance falters as you stagger.</yellow>");
    },

    effectDeactivated() {
      const target = this.target;

      target.setMeta('staggered_override', false);
      target.removeTag?.('is_staggered');

      target.say("<cyan>You steady yourself.</cyan>");
    }
  }
};

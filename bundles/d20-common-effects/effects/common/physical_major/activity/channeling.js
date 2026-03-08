'use strict';

/**
 * Effect: Channeling
 * You channel divine, spiritual, or supernatural energy.
 */
module.exports = {
  config: {
    name: "Channeling",
    description: "You channel powerful energies, increasing spell potency but restricting movement.",
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
      spellPower: +2,
      will: +1,
      reflex: -2,
      speed: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('channeling_override', true);
      this.target.addTag?.('is_channeling');
      this.target.say("<yellow>You begin channeling powerful energies.</yellow>");
    },

    effectDeactivated() {
      this.target.setMeta('channeling_override', false);
      this.target.removeTag?.('is_channeling');
      this.target.say("<cyan>Your channeling ends.</cyan>");
    },

    move() {
      this.target.say("You cannot move while channeling.");
      return false;
    },

    damaged() {
      this.target.say("<red>Your concentration breaks and the channel collapses!</red>");
      this.remove();
    }
  }
};

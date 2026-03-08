'use strict';

/**
 * Effect: Wild Talent
 * A latent psionic spark grants minor psionic sensitivity.
 */
module.exports = {
  config: {
    name: "Wild Talent",
    description: "A latent psionic spark grants minor psionic sensitivity.",
    type: "condition",
    family: "psionics",
    tier: 0,
    maxTier: 0,
    duration: null,
    unique: true,
    persists: true
  },

  state: {},

  modifiers: {
    attributes: {
      psionicPower: +1,
      perception: +1
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('wild_talent', true);
      this.target.say("<magenta>You feel a latent psionic spark awaken within you.</magenta>");
    },

    effectDeactivated() {
      this.target.setMeta('wild_talent', false);
      this.target.say("<cyan>Your latent psionic spark fades.</cyan>");
    }
  }
};

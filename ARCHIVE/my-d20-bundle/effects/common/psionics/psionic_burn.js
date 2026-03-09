'use strict';

/**
 * Effect: Psionic Burn (Tier 3)
 * A psionic backlash that damages mental faculties.
 */
module.exports = {
  config: {
    name: "Psionic Burn",
    description: "A psionic backlash scorches your mental pathways.",
    type: "condition",
    family: "psionics",
    tier: 3,
    maxTier: 3,
    duration: 30000,
    unique: true,
    persists: false
  },

  state: {
    damageAmount: 2
  },

  modifiers: {
    attributes: {
      will(current) {
        return current - this.state.damageAmount;
      },
      intelligence(current) {
        return current - this.state.damageAmount;
      },
      psionicPower(current) {
        return current - 2;
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>A psionic backlash scorches your mind!</b></red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your mental pathways stabilize.</cyan>");
    }
  }
};

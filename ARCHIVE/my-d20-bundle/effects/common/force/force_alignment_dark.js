'use strict';

/**
 * Effect: Dark-Side Alignment (Tier 2)
 * You resonate with the Dark Side of the Force.
 */
module.exports = {
  config: {
    name: "Dark-Side Alignment",
    description: "You resonate with the Dark Side of the Force.",
    type: "condition",
    family: "force",
    tier: 2,
    maxTier: 4,
    duration: 45000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      forcePower: +2,
      will: +1,
      perception: +1,
      corruption: (current) => current + 1,
      sanity: (current) => current - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>You feel a surge of power as the Dark Side coils around you.</red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The Dark-Side resonance withdraws.</cyan>");
    }
  }
};

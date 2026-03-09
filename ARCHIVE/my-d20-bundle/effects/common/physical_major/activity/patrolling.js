'use strict';

/**
 * Effect: Patrolling
 * You move with heightened awareness, scanning for threats.
 */
module.exports = {
  config: {
    name: "Patrolling",
    description: "You move with heightened awareness, scanning for threats.",
    type: "condition",
    family: "physical_major_activity",
    tier: 1,
    maxTier: 1,
    duration: null,
    unique: true,
    persists: false
  },

  state: {
    tickCount: 0
  },

  modifiers: {
    attributes: {
      perception: +2,
      reflex: +1
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('patrolling_override', true);
      this.target.addTag?.('is_patrolling');
      this.target.say("<green>You begin patrolling the area.</green>");
    },

    effectDeactivated() {
      this.target.setMeta('patrolling_override', false);
      this.target.removeTag?.('is_patrolling');
      this.target.say("<cyan>You stop patrolling.</cyan>");
    },

    updateTick() {
      this.state.tickCount++;
      if (this.state.tickCount % 5 === 0) {
        this.target.say("<yellow>You scan your surroundings...</yellow>");
      }
    },

    damaged() {
      this.target.say("<red>Your patrol is interrupted!</red>");
      this.remove();
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Berserk",
    description: "Instinct overrides discipline. You attack without restraint and cannot retreat or use complex actions.",
    type: "condition",
    family: "loss_of_control",
    tier: 2,
    maxTier: 3,
    duration: 45000
  },

  state: {},

  modifiers: {
    attributes: {
      attack: +4,
      damage: +3,
      armorKinetic: -2,
      armorEnergy: -2,
      will: -3,
      perception: -3
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<red>A surge of raw instinct seizes control of your movements.</red>");

      // Mark the player as forced-action mode
      player.setMeta('berserk_override', true);
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>Your awareness returns as the instinctive surge fades.</cyan>");

      // Remove forced-action mode
      player.setMeta('berserk_override', false);
    }
  }
};

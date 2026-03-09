'use strict';

/**
 * Effect: Prone
 * You are on the ground. Penalties to defense and ranged attacks.
 */
module.exports = {
  config: {
    name: "Prone",
    description: "You are lying on the ground, reducing your mobility and defenses.",
    type: "condition",
    family: "physical_major_posture",
    tier: 1,
    maxTier: 1,
    duration: 20000, // 20 seconds; adjust if you want persistent
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      // Your original rule: -4 kinetic AC
      armorKinetic: (current) => current - 4,

      // Canonical posture penalties
      reflex: -2,
      dexterity: -1,
      attack: -2,       // ranged attacks suffer
      perception: -1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.addTag('is_prone');
      player.setMeta('prone_override', true);
      player.say("<yellow>You fall to the ground.</yellow>");
    },

    effectDeactivated() {
      const player = this.target;
      player.removeTag('is_prone');
      player.setMeta('prone_override', false);
      player.say("<cyan>You rise back to your feet.</cyan>");
    }
  }
};

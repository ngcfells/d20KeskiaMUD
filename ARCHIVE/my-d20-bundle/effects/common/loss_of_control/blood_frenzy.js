'use strict';

module.exports = {
  config: {
    name: "Blood Frenzy",
    description: "A predatory instinct takes hold. You prioritize living targets and strike with unnatural ferocity.",
    type: "condition",
    family: "loss_of_control",
    tier: 3,
    maxTier: 3,
    duration: 60000
  },

  state: {},

  modifiers: {
    attributes: {
      attack: +5,
      damage: +4,
      will: -4,
      reflex: -3,
      perception: -4,
      armorKinetic: -3,
      armorEnergy: -3
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<red>A predatory intensity floods your senses.</red>");

      // Mark the player as forced-action mode with priority targeting
      player.setMeta('blood_frenzy_override', true);

      // Optional: escalate corruption slightly
      if (player.hasAttribute('corruption')) {
        player.mutateAttribute('corruption', 1);
      }
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>The predatory surge drains from your limbs.</cyan>");

      player.setMeta('blood_frenzy_override', false);
    }
  }
};

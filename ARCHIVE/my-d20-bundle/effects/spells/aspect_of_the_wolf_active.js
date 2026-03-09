'use strict';

/**
 * Aspect of the Wolf Effect
 * -------------------------
 * Forces physical attributes to Wolf base (Str 13, Dex 15, Con 15)
 * and grants natural armor and the Trip behavior.
 */
module.exports = {
  config: {
    name: "Aspect of the Wolf",
    description: "You have polymorphed into a wolf.",
    type: "condition",
    family: "polymorph",
    tier: 1,
    maxTier: 1
  },
  state: {},
  modifiers: {
    attributes: {
      // Polymorph sets the base to these values regardless of original stats
      strength: (current) => 13,
      dexterity: (current) => 15,
      constitution: (current) => 15,
      naturalArmor: (current) => current + 2
    }
  },
  listeners: {
    effectActivated() {
      const player = this.target;
      player.addBehavior('can_trip'); // Grants access to 'trip' command/skill
      player.setMeta('isPolymorphed', true);
      player.setMeta('original_appearance', player.getAttribute('appearance'));
      player.setAttribute('appearance', 2); // Wolves aren't known for high Charismatic Appearance
    },
    effectDeactivated() {
      const player = this.target;
      player.removeBehavior('can_trip');
      player.setMeta('isPolymorphed', false);
      player.say("<yellow>Your bones ache as they shift back into your natural form.</yellow>");
    }
  }
};

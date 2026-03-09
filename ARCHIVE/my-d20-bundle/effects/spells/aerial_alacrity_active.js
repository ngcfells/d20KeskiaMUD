// path: ./bundles/my-d20-bundle/effects/spells/aerial_alacrity_active.js
'use strict';

module.exports = {
  config: {
    name: "Aerial Alacrity",
    description: "+30ft Fly Speed, Improved Maneuverability, +1 Dodge AC vs AoO, +1 Reflex.",
    type: "buff",
    family: "speed",
    tier: 3,
    maxTier: 5
  },

  state: {
    dodgeBonus: 1,
    reflexBonus: 1,
    speedBonus: 30
  },

  modifiers: {
    attributes: {
      reflex: 1
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      target.say("<cyan>Your wings feel light as the wind itself, every draft propelling you with newfound grace.</cyan>");
      
      // Perspective: Room
      target.room.broadcastExcept(target, `<cyan>Wind currents visibly spiral around ${target.name}, lifting them into a more agile stance.</cyan>`);
    },

    effectDeactivated() {
      const target = this.target;
      target.say("<yellow>The supernatural lift beneath your wings fades, and the air feels heavy once more.</yellow>");
    }
  }
};

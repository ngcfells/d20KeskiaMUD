'use strict';

/**
 * Effect: Barkskin (Natural Armor Enhancement)
 * Toughens the subject's skin into a ridge-filled, bark-like hide.
 * Logic: Adds an enhancement bonus to the naturalArmor attribute.
 */
module.exports = {
  config: {
    name: "Barkskin",
    description: "Your skin is as tough and brown as the bark of an ancient oak.",
    type: "buff",
    family: "transmutation",
    tier: 1,
    maxTier: 1,
  },
  state: {
    bonus: 2
  },
  modifiers: {
    attributes: {
      // Enhancement bonus to Natural Armor. 
      // Note: In a full d20 engine, this should be typed as 'enhancement' 
      // to prevent stacking with other enhancement bonuses (like Amulet of NA).
      naturalArmor: function(current) {
        return current + this.state.bonus;
      }
    }
  },
  listeners: {
    effectActivated() {
      this.target.say("<green>Your skin itches and thickens, turning dark brown and forming deep, protective ridges like tree bark.</green>");
      this.target.room.broadcastExcept(this.target, `<green>${this.target.name}'s flesh transforms into a rough, wood-like substance.</green>`);
    },
    effectDeactivated() {
      this.target.say("<yellow>The wooden ridges on your skin soften and flake away, leaving your flesh supple once more.</yellow>");
      this.target.room.broadcastExcept(this.target, `<white>The bark-like hide covering ${this.target.name} crumbles into dust.</white>`);
    }
  }
};

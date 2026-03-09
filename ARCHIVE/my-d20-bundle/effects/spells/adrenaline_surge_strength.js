'use strict';

module.exports = {
  config: {
    name: "Adrenaline Surge Strength",
    description: "Enhanced strength from a magical aura.",
    type: "buff",
    family: "enhancement", // d20 Rule: Enhancement bonuses don't stack
    tier: 2,
    duration: 6000
  },

  modifiers: {
    attributes: {
      strength: 4
    }
  },

  listeners: {
    effectDeactivated() {
      this.target.say("<yellow>The surge of extra strength withers as you move too far from your master.</yellow>");
    }
  }
};

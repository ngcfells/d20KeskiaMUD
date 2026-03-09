'use strict';
const { ACID } = require('../../../lib/combat/damage-types');

module.exports = {
  config: {
    name: "Lingering Acid",
    description: "The acid from the spray continues to dissolve your flesh.",
    type: "condition",
    family: "corrosion",
    tier: 2,
    duration: 6000
  },

  state: {
    pendingDamage: 0,
    attacker: null
  },

  listeners: {
    effectDeactivated() {
      const target = this.target;
      const state = this.gameState;

      target.say("<bold><red>The acid on your body flares one last time before neutralizing!</red></bold>");
      
      state.Damage.apply({
        amount: this.state.pendingDamage,
        type: ACID,
        attacker: this.state.attacker,
        target: target,
        source: "Acidic Spray (Lingering)"
      });
    }
  }
};

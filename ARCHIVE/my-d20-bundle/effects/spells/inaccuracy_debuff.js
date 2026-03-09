'use strict';
module.exports = {
  config: {
    name: "Inaccurate",
    description: "Distance is warped for those attacking you.",
    type: "condition",
    duration: 6000
  },
  listeners: {
    /**
     * Intercept incoming ranged attacks.
     * Force the range category to be treated as one higher.
     */
    onBeingAttacked(attacker, attack) {
      if (attack.type === 'ranged') {
        attack.rangePenalty = (attack.rangePenalty || 0) - 2; // -2 is standard d20 per increment
        attacker.say("<yellow>Your target seems further away than they appear!</yellow>");
      }
    }
  }
};

// path: bundles/my-d20-bundle/effects/spells/acid_rain_storm.js
'use strict';

module.exports = {
  config: {
    name: "Acid Rain",
    description: "The area is a torrential downpour of acid; ground is slick and muddy.",
    type: "field",
    family: "hazard",
    tier: 3,
    duration: 6000
  },

  modifiers: {
    roomAttributes: {
      // Custom attribute to flag movement difficulty
      movementCostMultiplier: 2 
    }
  },

  listeners: {
    /**
     * Obscured Vision (Similar to Heavy Rain)
     */
    onBeforeAttack(attacker, target, attack) {
      if (attack.metadata?.range === 'ranged' && Math.random() < 0.20) {
        attacker.say("<yellow>The driving acid rain makes it impossible to aim clearly!</yellow>");
        return false;
      }
    }
  }
};

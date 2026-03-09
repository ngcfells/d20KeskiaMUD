// path: bundles/my-d20-bundle/effects/spells/acid_cloud_hazard.js
'use strict';

module.exports = {
  config: {
    name: "Acid Cloud",
    description: "A thick, caustic mist obscures vision and eats at equipment.",
    type: "field",
    family: "concealment",
    tier: 2,
    duration: 6000
  },

  listeners: {
    /**
     * Obscured Vision: 20% Miss Chance
     */
    onBeforeAttack(attacker, target, attack) {
      if (Math.random() < 0.20) {
        attacker.say("<yellow>The thick yellow fumes cause your strike to go wide!</yellow>");
        return false; // Cancel attack
      }
    },

    effectDeactivated() {
      this.target.emit("<cyan>The yellow acidic vapors finally dissipate, leaving the air clear once more.</cyan>");
    }
  }
};

'use strict';

/**
 * Avoid Planar Effects Condition
 * ------------------------------
 * Hooks into the environmental damage and suffocation systems to negate
 * planar-specific traits.
 */
module.exports = {
  config: {
    name: "Avoid Planar Effects",
    description: "You are magically adapted to the environmental traits of this plane.",
    type: "condition",
    family: "abjuration",
    tier: 1,
    maxTier: 1
  },
  state: {
    planeId: 'Material'
  },
  listeners: {
    effectActivated() {
      const unit = this.target;

      // Hook: Negate environmental damage (Heat, Cold, Acid Rain, etc.)
      this.envHook = (damageData) => {
        if (damageData.sourceType === 'planar_trait' && damageData.plane === this.state.planeId) {
          damageData.amount = 0;
          damageData.negated = true;
        }
      };

      // Hook: Negate suffocation (Lack of air, poisonous atmosphere)
      this.suffocationHook = (suffocationData) => {
        if (suffocationData.cause === 'planar_environment') {
          suffocationData.immune = true;
        }
      };

      state.addHook('onEnvironmentDamage', this.envHook);
      state.addHook('onCheckSuffocation', this.suffocationHook);
    },

    effectDeactivated() {
      state.removeHook('onEnvironmentDamage', this.envHook);
      state.removeHook('onCheckSuffocation', this.suffocationHook);
      this.target.say("<yellow>The protective shell shielding you from the plane's environment has dissolved.</yellow>");
    }
  }
};

'use strict';

/**
 * Greater Enhance Skeletons Effect
 * --------------------------------
 * 1. Sets damageReduction to 20.
 * 2. Halves incoming Piercing/Slashing damage.
 */
module.exports = {
  config: {
    name: "Greater Enhanced Skeleton",
    description: "Bones reinforced with adamantine, granting DR 20/magic and extreme physical resistance.",
    type: "condition",
    family: "necromancy",
    tier: 2, // Higher tier than standard Enhance Skeletons
    maxTier: 2
  },
  modifiers: {
    attributes: {
      damageReduction: (current) => 20
    }
  },
  listeners: {
    onDamageReceived: state => function (damageData) {
      const physical = ['piercing', 'slashing'];
      if (physical.includes(damageData.type)) {
        damageData.amount = Math.floor(damageData.amount / 2);
        this.target.say("<white>The weapon rings uselessly against your adamantine-hardened structure.</white>");
      }
    },
    
    effectActivated() {
      this.target.setMeta('dr_bypass_type', 'magic');
    }
  }
};

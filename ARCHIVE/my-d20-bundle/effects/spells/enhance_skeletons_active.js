'use strict';

/**
 * Enhance Skeletons Effect
 * -----------------------
 * 1. Sets damageReduction to 10.
 * 2. Intercepts incoming damage to halve Piercing/Slashing.
 */
module.exports = {
  config: {
    name: "Enhanced Skeleton",
    description: "Bones reinforced with iron, granting DR 10/magic and physical resistance.",
    type: "condition",
    family: "necromancy",
    tier: 1,
    maxTier: 1
  },
  modifiers: {
    attributes: {
      damageReduction: (current) => 10
    }
  },
  listeners: {
    /**
     * Intercept damage before it hits the DR calculation
     */
    onDamageReceived: state => function (damageData) {
      const pAndS = ['piercing', 'slashing'];
      
      if (pAndS.includes(damageData.type)) {
        damageData.amount = Math.floor(damageData.amount / 2);
        this.target.say("<white>The blow slides off your iron-hard ribs with reduced impact.</white>");
      }
      
      // DR 10/magic logic usually handled by the core damage engine 
      // checking 'damageReduction' attribute and 'isMagical' flag on weapon.
    },
    
    effectActivated() {
      this.target.setMeta('dr_bypass_type', 'magic');
    }
  }
};

'use strict';

/**
 * Path: ./bundles/my-d20-bundle/effects/[category]/[effect_name].js
 * Unified Effect/Condition Template
 */
module.exports = {
  config: {
    name: "ConditionName",
    description: "Short, non‑emotional, mechanical description.",
    type: "condition", 
    family: "fear",     
    tier: 1,            
    maxTier: 5,         
    duration: 30000     
  },

  state: {
    sourceSpell: null, // ID of the spell that caused this
    caster: null       // Reference to the caster for scaling math
  },

  modifiers: {
    attributes: {
      // Example: strength: -2, reflex: -1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      // Use this.state.caster if scaling is needed for the message
      player.say("<color>Activation message (narrative‑safe).</color>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<color>Deactivation message (narrative‑safe).</color>");
    },
    
    // Optional: Add logic for specific d20 events (e.g. onTakeDamage, onAttack)
  }
};

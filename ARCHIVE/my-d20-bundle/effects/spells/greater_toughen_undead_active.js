'use strict';

/**
 * Greater Toughen Undead Effect
 * -----------------------------
 * Grants +5 Turn Resistance (mapped to Resolve/Will for turn checks).
 */
module.exports = {
  config: {
    name: "Greater Toughened Undead",
    description: "Infused with caster blood, granting +5 Turn Resistance.",
    type: "condition",
    family: "necromancy",
    tier: 3, // Highest tier in the 'Toughen' family
    maxTier: 3
  },
  modifiers: {
    attributes: {
      // Turn Resistance +5 stacks with natural resistance. 
      // Mapping to 'resolve' and 'will' to influence Turn Undead save math.
      resolve: (current) => current + 5,
      will: (current) => current + 5
    }
  },
  listeners: {
    effectActivated() {
      this.target.setMeta('turnResistanceBonus', 5);
      this.target.say("<magenta>Your spiritual anchor to this plane hardens against divine expulsion.</magenta>");
    },
    effectDeactivated() {
      this.target.setMeta('turnResistanceBonus', 0);
    }
  }
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_grappler.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "agile_grappler",
  name: "Agile Grappler",
  category: "combat",
  type: "feat",
  description: "You use agility rather than brute strength to grapple effectively, granting passive bonuses to grapple checks.",

  stanceEffects: {
    base: {
      grappleBonus: 1
    },
    aggressive: {
      grappleBonus: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};

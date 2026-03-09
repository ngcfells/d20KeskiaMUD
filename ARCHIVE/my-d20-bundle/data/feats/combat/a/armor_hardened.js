// Source: Starfinder Armory (Paizo)
// Additional Sources: Pathfinder APG (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armor_hardened.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armor_hardened",
  name: "Armor Hardened",
  category: "tech",
  type: "feat",
  description: "Your armor is reinforced and optimized, granting passive bonuses to damage reduction.",

  stanceEffects: {
    base: {
      damageReduction: 1
    },
    aggressive: {},
    defensive: {
      damageReduction: 2
    },
    perceptive: {}
  },

  hooks: {}
};

// Source: Starfinder Armory (Paizo)
// Additional Sources: Pathfinder APG (Paizo), d20 Modern (Wizards of the Coast), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armored_swiftness.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armored_swiftness",
  name: "Armored Swiftness",
  category: "movement",
  type: "feat",
  description: "You move more quickly in armor, reducing speed penalties.",

  stanceEffects: {
    base: {
      speedPenaltyReduction: 5
    },
    aggressive: {},
    defensive: {
      speedPenaltyReduction: 10
    },
    perceptive: {}
  },

  hooks: {}
};

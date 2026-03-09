// Source: Complete Arcane (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Armory (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armored_casting.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armored_casting",
  name: "Armored Casting",
  category: "magic",
  type: "feat",
  description: "You have trained to cast spells while wearing armor, reducing arcane spell failure chance.",

  stanceEffects: {
    base: {
      arcaneSpellFailureReduction: 10
    },
    aggressive: {},
    defensive: {
      arcaneSpellFailureReduction: 15
    },
    perceptive: {}
  },

  hooks: {}
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armored_vigilance.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armored_vigilance",
  name: "Armored Vigilance",
  category: "combat",
  type: "feat",
  description: "You remain alert and aware even while armored, granting passive bonuses to perception and initiative.",

  stanceEffects: {
    base: {
      initiativeBonus: 1
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      initiativeBonus: 2
    }
  },

  hooks: {}
};

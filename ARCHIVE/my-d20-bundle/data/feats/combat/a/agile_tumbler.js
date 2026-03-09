// Source: Complete Adventurer (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_tumbler.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "agile_tumbler",
  name: "Agile Tumbler",
  category: "movement",
  type: "feat",
  description: "You tumble with exceptional finesse, granting passive bonuses to acrobatics and avoiding attacks of opportunity.",

  stanceEffects: {
    base: {
      skillBonus: {
        tumble: 2
      }
    },
    aggressive: {},
    defensive: {
      acVsOpportunityAttacks: 1
    },
    perceptive: {}
  },

  hooks: {}
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Armory (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armored_sprint.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armored_sprint",
  name: "Armored Sprint",
  category: "movement",
  type: "feat",
  description: "You can sprint effectively even while armored, granting passive bonuses to speed and charge distance.",

  stanceEffects: {
    base: {
      speedBonus: 5
    },
    aggressive: {
      chargeDistanceBonus: 5
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};

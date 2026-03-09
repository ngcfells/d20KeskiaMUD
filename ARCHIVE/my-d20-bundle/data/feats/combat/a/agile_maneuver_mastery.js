// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_maneuver_mastery.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "agile_maneuver_mastery",
  name: "Agile Maneuver Mastery",
  category: "combat",
  type: "feat",
  description: "You perform combat maneuvers with exceptional finesse, granting passive bonuses to maneuver accuracy.",

  stanceEffects: {
    base: {
      maneuverBonus: 1
    },
    aggressive: {
      maneuverBonus: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};

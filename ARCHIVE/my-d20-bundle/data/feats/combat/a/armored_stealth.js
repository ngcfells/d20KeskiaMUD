// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Quintessential Rogue (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armored_stealth.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armored_stealth",
  name: "Armored Stealth",
  category: "movement",
  type: "feat",
  description: "You have learned to move quietly even while armored, granting passive bonuses to stealth.",

  stanceEffects: {
    base: {
      skillBonus: {
        hide: 2,
        move_silently: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        hide: 3,
        move_silently: 3
      }
    }
  },

  hooks: {}
};

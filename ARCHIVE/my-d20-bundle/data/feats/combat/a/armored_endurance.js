// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Armory (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armored_endurance.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armored_endurance",
  name: "Armored Endurance",
  category: "combat",
  type: "feat",
  description: "You are accustomed to long periods in armor, granting passive bonuses to stamina and fatigue resistance.",

  stanceEffects: {
    base: {
      saveBonus: {
        fortitude: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        fortitude: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};

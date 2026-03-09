// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Armory (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armored_toughness.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armored_toughness",
  name: "Armored Toughness",
  category: "combat",
  type: "feat",
  description: "Your armor training enhances your durability, granting passive bonuses to hit points and damage reduction.",

  stanceEffects: {
    base: {
      maxHpBonus: 2
    },
    aggressive: {},
    defensive: {
      maxHpBonus: 3
    },
    perceptive: {}
  },

  hooks: {}
};

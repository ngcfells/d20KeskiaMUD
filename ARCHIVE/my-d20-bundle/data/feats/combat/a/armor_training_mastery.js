// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Armory (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armor_training_mastery.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armor_training_mastery",
  name: "Armor Training Mastery",
  category: "combat",
  type: "feat",
  description: "You have mastered advanced armor techniques, granting passive bonuses to armor efficiency and movement.",

  stanceEffects: {
    base: {
      armorBonus: 1,
      armorCheckPenaltyReduction: 1
    },
    aggressive: {},
    defensive: {
      armorBonus: 2
    },
    perceptive: {}
  },

  hooks: {}
};

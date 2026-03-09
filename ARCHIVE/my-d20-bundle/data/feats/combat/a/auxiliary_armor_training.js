// Source: Starfinder Armory (Paizo)
// Additional Sources: Pathfinder APG (Paizo), d20 Modern (Wizards of the Coast), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/auxiliary_armor_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "auxiliary_armor_training",
  name: "Auxiliary Armor Training",
  category: "tech",
  type: "feat",
  description: "You have specialized training with auxiliary armor systems, granting passive bonuses to armor efficiency.",

  stanceEffects: {
    base: {
      armorBonus: 1
    },
    aggressive: {},
    defensive: {
      armorBonus: 2
    },
    perceptive: {}
  },

  hooks: {}
};

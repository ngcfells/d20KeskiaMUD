// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Armory (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armor_bond.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armor_bond",
  name: "Armor Bond",
  category: "combat",
  type: "feat",
  description: "You form a deep connection with your armor, granting passive bonuses to its effectiveness and durability.",

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

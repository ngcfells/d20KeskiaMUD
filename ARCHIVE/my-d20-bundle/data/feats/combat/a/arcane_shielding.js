// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Arcana Evolved (Malhavoc Press), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_shielding.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_shielding",
  name: "Arcane Shielding",
  category: "magic",
  type: "feat",
  description: "You can shape magical energy into protective barriers, granting passive bonuses to magical defense.",

  stanceEffects: {
    base: {
      spellResistanceBonus: 2
    },
    aggressive: {},
    defensive: {
      spellResistanceBonus: 3
    },
    perceptive: {}
  },

  hooks: {}
};

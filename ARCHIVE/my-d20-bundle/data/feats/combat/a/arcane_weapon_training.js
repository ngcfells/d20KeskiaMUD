// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Armory (Paizo), Arcana Evolved (Malhavoc Press)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_weapon_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_weapon_training",
  name: "Arcane Weapon Training",
  category: "combat",
  type: "feat",
  description: "You channel arcane knowledge into your weapon techniques, granting passive bonuses to accuracy and damage with magical weapons.",

  stanceEffects: {
    base: {
      attackBonus: 1
    },
    aggressive: {
      damageBonus: 1
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};

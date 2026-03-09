// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Armory (Paizo), Races of the Wild (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/aerial_weapon_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "aerial_weapon_training",
  name: "Aerial Weapon Training",
  category: "combat",
  type: "feat",
  description: "You are trained to use weapons effectively while airborne, granting passive bonuses to aerial accuracy.",

  stanceEffects: {
    base: {
      attackBonusAerial: 1
    },
    aggressive: {
      damageBonusAerial: 1
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};

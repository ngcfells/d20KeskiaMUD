// Source: Starfinder Armory (Paizo)
// Additional Sources: Pathfinder APG (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/auxiliary_weapon_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "auxiliary_weapon_training",
  name: "Auxiliary Weapon Training",
  category: "tech",
  type: "feat",
  description: "You are trained in the use of auxiliary or secondary weapons, granting passive bonuses to accuracy and handling.",

  stanceEffects: {
    base: {
      attackBonus: 1
    },
    aggressive: {
      attackBonus: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};

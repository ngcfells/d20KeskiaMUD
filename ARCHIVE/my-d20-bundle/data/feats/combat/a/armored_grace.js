// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Armory (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armored_grace.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armored_grace",
  name: "Armored Grace",
  category: "combat",
  type: "feat",
  description: "You move with practiced grace while armored, granting passive bonuses to dodge and maneuvering.",

  stanceEffects: {
    base: {
      dodgeBonus: 1
    },
    aggressive: {},
    defensive: {
      dodgeBonus: 2
    },
    perceptive: {}
  },

  hooks: {}
};

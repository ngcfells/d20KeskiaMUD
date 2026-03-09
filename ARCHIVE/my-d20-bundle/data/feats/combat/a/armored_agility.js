// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Armory (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armored_agility.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armored_agility",
  name: "Armored Agility",
  category: "combat",
  type: "feat",
  description: "You move with surprising agility even while armored, granting passive bonuses to mobility and balance.",

  stanceEffects: {
    base: {
      skillBonus: {
        balance: 1
      }
    },
    aggressive: {},
    defensive: {
      skillBonus: {
        balance: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};

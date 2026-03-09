// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Armory (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_shield_fighter.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "agile_shield_fighter",
  name: "Agile Shield Fighter",
  category: "combat",
  type: "feat",
  description: "You combine agility with shield use, granting passive bonuses to shield attacks and defense.",

  stanceEffects: {
    base: {
      shieldAttackBonus: 1,
      shieldDodgeBonus: 1
    },
    aggressive: {
      shieldAttackBonus: 2
    },
    defensive: {
      shieldDodgeBonus: 2
    },
    perceptive: {}
  },

  hooks: {}
};

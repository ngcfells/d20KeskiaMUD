// Source: Pathfinder Advanced Player's Guide (Paizo)
// Additional Sources: Starfinder Armory (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
* BUNDLE: my-d20-bundle
* PATH: bundles/my-d20-bundle/data/feats/combat/a/advanced_shield_training.js
* PURPOSE: Passive stance‑based feat definition.
*/

module.exports = {
  id: "advanced_shield_training",
  name: "Advanced Shield Training",
  category: "combat",
  type: "feat",
  description: "You have mastered advanced shield techniques, granting passive bonuses to shield defense and stability.",
  prerequisites: {
    baseAttackBonus: 3, 
    abilityScores: {
      strength: 13
    },
    skills: {},
    feats: ["shield_focus"], // Required by d20 standards for "Advanced" shield techniques
    classFeatures: ["armor_training"], // Pathfinder 1e: Shield training is a subset of Armor Training
    race: null,
    alignment: null
  },
  stanceEffects: {
    base: {
      shieldBonus: 1
    },
    aggressive: {},
    defensive: {
      shieldBonus: 2
    },
    perceptive: {}
  },

  hooks: {}
};

// Source: Player’s Handbook II (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Armory (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armor_specialization_medium.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armor_specialization_medium",
  name: "Armor Specialization (Medium)",
  category: "combat",
  type: "feat",
  description: "You have mastered the use of medium armor, gaining improved protection and reduced penalties.",

  stanceEffects: {
    base: {
      damageReduction: 2
    },
    aggressive: {},
    defensive: {
      damageReduction: 3
    },
    perceptive: {}
  },

  hooks: {}
};

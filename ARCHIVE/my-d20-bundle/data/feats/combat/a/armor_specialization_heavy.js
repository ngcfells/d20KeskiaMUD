// Source: Player’s Handbook II (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Armory (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armor_specialization_heavy.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armor_specialization_heavy",
  name: "Armor Specialization (Heavy)",
  category: "combat",
  type: "feat",
  description: "You have mastered the use of heavy armor, gaining improved protection and reduced penalties.",

  stanceEffects: {
    base: {
      damageReduction: 3
    },
    aggressive: {},
    defensive: {
      damageReduction: 4
    },
    perceptive: {}
  },

  hooks: {}
};

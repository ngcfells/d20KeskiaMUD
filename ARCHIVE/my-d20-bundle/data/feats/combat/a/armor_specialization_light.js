// Source: Player’s Handbook II (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Armory (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armor_specialization_light.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armor_specialization_light",
  name: "Armor Specialization (Light)",
  category: "combat",
  type: "feat",
  description: "You have mastered the use of light armor, gaining improved protection and reduced penalties.",

  stanceEffects: {
    base: {
      damageReduction: 1
    },
    aggressive: {},
    defensive: {
      damageReduction: 2
    },
    perceptive: {}
  },

  hooks: {}
};

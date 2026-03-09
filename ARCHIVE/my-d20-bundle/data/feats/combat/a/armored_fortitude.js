// Source: Complete Warrior (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Armory (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armored_fortitude.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armored_fortitude",
  name: "Armored Fortitude",
  category: "combat",
  type: "feat",
  description: "Your training in armor grants passive bonuses to resisting physical trauma and critical hits.",

  stanceEffects: {
    base: {
      fortificationChance: 10
    },
    aggressive: {},
    defensive: {
      fortificationChance: 15
    },
    perceptive: {}
  },

  hooks: {}
};

// Source: Starfinder Core Rulebook (Paizo)
// Additional Sources: Pathfinder APG (Paizo), Quintessential Rogue (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armor_reflex_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armor_reflex_training",
  name: "Armor Reflex Training",
  category: "combat",
  type: "feat",
  description: "You have trained to react quickly even while armored, granting passive bonuses to Reflex saves.",

  stanceEffects: {
    base: {
      saveBonus: {
        reflex: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        reflex: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};

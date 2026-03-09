// Source: Starfinder Core Rulebook (Paizo)
// Additional Sources: Pathfinder APG (Paizo), Quintessential Rogue (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armored_reflexes.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armored_reflexes",
  name: "Armored Reflexes",
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

// Source: Star Wars Saga Edition (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Quintessential Rogue (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/artful_dodger.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "artful_dodger",
  name: "Artful Dodger",
  category: "combat",
  type: "feat",
  description: "Your agility allows you to evade attacks with finesse, granting passive bonuses to dodge and Reflex saves.",

  stanceEffects: {
    base: {
      dodgeBonus: 1,
      saveBonus: {
        reflex: 1
      }
    },
    aggressive: {},
    defensive: {
      dodgeBonus: 2,
      saveBonus: {
        reflex: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};

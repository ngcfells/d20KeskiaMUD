// Source: Pathfinder Core Rulebook (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armor_focus.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armor_focus",
  name: "Armor Focus",
  category: "combat",
  type: "feat",
  description: "You are especially skilled with a particular type of armor, granting passive bonuses to AC while wearing it.",

  stanceEffects: {
    base: {
      armorBonus: 1
    },
    aggressive: {},
    defensive: {
      armorBonus: 2
    },
    perceptive: {}
  },

  hooks: {}
};

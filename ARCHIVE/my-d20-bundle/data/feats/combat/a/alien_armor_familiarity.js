// Source: Starfinder Core Rulebook (Paizo)
// Additional Sources: d20 Future (Wizards of the Coast), Star Wars Saga Edition (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/alien_armor_familiarity.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "alien_armor_familiarity",
  name: "Alien Armor Familiarity",
  category: "combat",
  type: "feat",
  description: "You are familiar with alien armor systems, granting passive bonuses to armor efficiency and handling.",

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

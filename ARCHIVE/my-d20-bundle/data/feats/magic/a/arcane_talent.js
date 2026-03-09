
'use strict';

module.exports = {
  id: 'arcane_talent',
  name: 'Arcane Talent',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo), Starfinder Core Rulebook (Paizo), Arcana Evolved (Malhavoc Press)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_talent.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_talent",
  name: "Arcane Talent",
  description: "You possess a natural knack for magic, granting passive bonuses to spellcasting fundamentals.",
  category: "magic",

  stanceEffects: {
    base: {
      skillBonus: {
        spellcraft: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        spellcraft: 3
      }
    }
  },

  hooks: {}
};

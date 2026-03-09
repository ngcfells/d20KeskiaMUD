
'use strict';

module.exports = {
  id: 'animal_empathy',
  name: 'Animal Empathy',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/animal_empathy.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "animal_empathy",
  name: "Animal Empathy",
  description: "You possess an innate ability to calm and influence animals, granting passive bonuses to animal interaction.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        handle_animal: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        handle_animal: 3
      }
    }
  },

  hooks: {}
};

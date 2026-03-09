
'use strict';

module.exports = {
  id: 'animal_companion_training',
  name: 'Animal Companion Training',
  category: 'general',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo), Starfinder Alien Archive (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/animal_companion_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "animal_companion_training",
  name: "Animal Companion Training",
  description: "You are skilled at training and directing animal companions, granting passive bonuses to their performance.",
  category: "general",

  stanceEffects: {
    base: {
      companionBonus: {
        attack: 1,
        skill: 1
      }
    },
    aggressive: {
      companionBonus: {
        attack: 2
      }
    },
    defensive: {
      companionBonus: {
        ac: 1
      }
    },
    perceptive: {}
  },

  hooks: {}
};

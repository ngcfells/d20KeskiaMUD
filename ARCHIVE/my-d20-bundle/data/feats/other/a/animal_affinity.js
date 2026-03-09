
'use strict';

module.exports = {
  id: 'animal_affinity',
  name: 'Animal Affinity',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/animal_affinity.js
 * PURPOSE: Passive stance-based feat definition with full prerequisites.
 */

module.exports = {
  id: "animal_affinity",
  name: "Animal Affinity",
  description: "You are good with animals and can calm or train them easily.",
  category: "general",
  prerequisites: { skills: { handle_animal: 1 } },
  stanceEffects: {
    base: { skillBonus: { handle_animal: 2, ride: 2 } },
    aggressive: {},
    defensive: {},
    perceptive: { skillBonus: { handle_animal: 3 } }
  },
  hooks: {}
};

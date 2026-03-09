
'use strict';

module.exports = {
  id: 'affinity_for_magic',
  name: 'Affinity For Magic',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Core Rulebook (Paizo)
// Additional Sources: Arcana Evolved (Malhavoc Press), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/affinity_for_magic.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "affinity_for_magic",
  name: "Affinity for Magic",
  description: "You possess a natural affinity for magic, granting passive bonuses to spell identification and arcane intuition.",
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

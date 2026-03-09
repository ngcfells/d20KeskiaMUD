
'use strict';

module.exports = {
  id: 'athletic',
  name: 'Athletic',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/athletic.js
 * PURPOSE: Passive stance-based feat definition with full prerequisites.
 */

module.exports = {
  id: "athletic",
  name: "Athletic",
  description: "You are especially capable at climbing and swimming.",
  category: "general",
  prerequisites: { attributes: { str: 11 }, skills: { climb: 1, swim: 1 } },
  stanceEffects: {
    base: { skillBonus: { climb: 2, swim: 2 } },
    aggressive: { skillBonus: { climb: 3 } },
    defensive: {},
    perceptive: {}
  },
  hooks: {}
};

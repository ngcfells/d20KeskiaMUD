
'use strict';

module.exports = {
  id: 'azure_resilience',
  name: 'Azure Resilience',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/azure_resilience.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "azure_resilience",
  name: "Azure Resilience",
  description: "Your elemental nature reinforces your vitality, granting passive bonuses to resist cold and magical effects.",
  category: "magic",

  stanceEffects: {
    base: {
      saveBonus: {
        fortitude: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        fortitude: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};


'use strict';

module.exports = {
  id: 'azure_will',
  name: 'Azure Will',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/azure_will.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "azure_will",
  name: "Azure Will",
  description: "Your elemental heritage strengthens your resolve, granting passive bonuses to resist mental influence.",
  category: "general",

  stanceEffects: {
    base: {
      saveBonus: {
        will: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        will: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};

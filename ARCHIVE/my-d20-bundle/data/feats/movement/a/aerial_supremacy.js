
'use strict';

module.exports = {
  id: 'aerial_supremacy',
  name: 'Aerial Supremacy',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Races of the Wild (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/aerial_supremacy.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "aerial_supremacy",
  name: "Aerial Supremacy",
  description: "You dominate the skies with superior control and precision, granting passive bonuses to aerial maneuvering and combat.",
  category: "combat",

  stanceEffects: {
    base: {
      skillBonus: {
        fly: 2
      }
    },
    aggressive: {
      attackBonusAerial: 1
    },
    defensive: {
      dodgeBonusAerial: 1
    },
    perceptive: {}
  },

  hooks: {}
};

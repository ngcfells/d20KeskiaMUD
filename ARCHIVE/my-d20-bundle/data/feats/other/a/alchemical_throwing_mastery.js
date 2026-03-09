
'use strict';

module.exports = {
  id: 'alchemical_throwing_mastery',
  name: 'Alchemical Throwing Mastery',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)
/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/alchemical_throwing_mastery.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "alchemical_throwing_mastery",
  name: "Alchemical Throwing Mastery",
  description: "You have mastered the art of throwing alchemical items, granting passive bonuses to accuracy and splash control.",
  category: "combat",

  stanceEffects: {
    base: {
      attackBonusRangedTouch: 1
    },
    aggressive: {
      splashDamageBonus: 1
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};


'use strict';

module.exports = {
  id: 'arcane_bloodline',
  name: 'Arcane Bloodline',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Arcana Evolved (Malhavoc Press), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_bloodline.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_bloodline",
  name: "Arcane Bloodline",
  description: "Arcane heritage enhances your magical aptitude, granting passive bonuses to spellcasting and arcane knowledge.",
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

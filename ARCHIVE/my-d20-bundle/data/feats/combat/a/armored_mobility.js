// Source: d20 Modern Core Rulebook (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Armory (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armored_mobility.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armored_mobility",
  name: "Armored Mobility",
  category: "combat",
  type: "feat",
  description: "You move more freely in armor, reducing armor check penalties.",

  stanceEffects: {
    base: {
      armorCheckPenaltyReduction: 1
    },
    aggressive: {},
    defensive: {
      armorCheckPenaltyReduction: 2
    },
    perceptive: {}
  },

  hooks: {}
};

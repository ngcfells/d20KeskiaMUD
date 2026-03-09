
'use strict';

module.exports = {
  id: 'adept_unarmed_combatant',
  name: 'Adept Unarmed Combatant',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo), Starfinder Core Rulebook (Paizo), Quintessential Monk (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/adept_unarmed_combatant.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "adept_unarmed_combatant",
  name: "Adept Unarmed Combatant",
  description: "You are trained in unarmed combat, granting passive bonuses to unarmed accuracy and defense.",
  category: "combat",

  stanceEffects: {
    base: {
      unarmedAttackBonus: 1
    },
    aggressive: {
      unarmedDamageBonus: 1
    },
    defensive: {
      dodgeBonus: 1
    },
    perceptive: {}
  },

  hooks: {}
};

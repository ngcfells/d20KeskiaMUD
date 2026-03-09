// Source: Frostburn (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arctic_mobility.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arctic_mobility",
  name: "Arctic Mobility",
  category: "movement",
  type: "feat",
  description: "You move easily across snow and ice, granting passive bonuses to avoid slipping and navigate frozen terrain.",

  stanceEffects: {
    base: {
      skillBonus: {
        balance: 2
      }
    },
    aggressive: {},
    defensive: {
      skillBonus: {
        balance: 3
      }
    },
    perceptive: {}
  },

  hooks: {}
};

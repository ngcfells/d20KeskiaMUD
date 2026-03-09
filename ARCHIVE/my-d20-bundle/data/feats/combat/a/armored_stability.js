// Source: Races of Stone (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Armory (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armored_stability.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armored_stability",
  name: "Armored Stability",
  category: "combat",
  type: "feat",
  description: "Your stance remains firm even under pressure, granting passive bonuses against forced movement.",

  stanceEffects: {
    base: {
      resistBullRush: 2,
      resistTrip: 2
    },
    aggressive: {},
    defensive: {
      resistBullRush: 3,
      resistTrip: 3
    },
    perceptive: {}
  },

  hooks: {}
};

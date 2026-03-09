// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Armory (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/armor_stability_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "armor_stability_training",
  name: "Armor Stability Training",
  category: "combat",
  type: "feat",
  description: "You maintain exceptional balance while armored, granting passive bonuses against forced movement.",,

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

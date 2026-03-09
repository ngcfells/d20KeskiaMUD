// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/datafeats/heritage/a/azure_bloodline.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "azure_bloodline",
  name: "Azure Bloodline",
  category: "heritage",
  type: "feat",
  description: "Your elemental heritage grants passive bonuses to cold resistance and arcane intuition.",

  stanceEffects: {
    base: {
      coldResistance: 2
    },
    aggressive: {},
    defensive: {
      coldResistance: 3
    },
    perceptive: {
      skillBonus: {
        spellcraft: 1
      }
    }
  },

  hooks: {}
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Dragon Magazine (Paizo/WotC), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: my-d20-feats
 * PATH: bundles/my-d20-feats/data/feats/heritage/a/angelic_bloodline.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "angelic_bloodline",
  name: "Angelic Bloodline",
  category: "heritage",
  type: "feat",
  description: "Celestial heritage grants you passive bonuses to resistance and perception of evil influences.",

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
    perceptive: {
      detectEvilBonus: 2
    }
  },

  hooks: {}
};

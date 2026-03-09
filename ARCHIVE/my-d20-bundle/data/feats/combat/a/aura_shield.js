// Source: Pathfinder Occult Adventures (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Dreamscarred Press Psionics (3PP)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/aura_shield.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "aura_shield",
  name: "Aura Shield",
  category: "magic",
  type: "feat",
  description: "You can reinforce your aura to protect yourself, granting passive bonuses to magical and psychic defense.",

  stanceEffects: {
    base: {
      spellResistanceBonus: 1
    },
    aggressive: {},
    defensive: {
      spellResistanceBonus: 2
    },
    perceptive: {}
  },

  hooks: {}
};

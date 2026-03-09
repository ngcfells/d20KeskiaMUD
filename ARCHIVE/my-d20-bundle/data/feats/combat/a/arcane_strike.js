// Source: Complete Warrior (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo), Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_strike.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_strike",
  name: "Arcane Strike",
  category: "magic",
  type: "feat",
  description: "Your martial attacks are infused with arcane power, granting passive bonuses to weapon damage.",

  stanceEffects: {
    base: {
      damageBonus: 1
    },
    aggressive: {
      damageBonus: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {
    onAttack(attacker, defender, state) {
      if (state.hasArcaneCasterLevel(attacker)) {
        return { damageBonus: 1 };
      }
    }
  }
};

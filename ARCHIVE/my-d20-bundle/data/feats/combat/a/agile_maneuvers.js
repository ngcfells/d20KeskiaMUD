// Source: Pathfinder Core Rulebook (Paizo)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_maneuvers.js
 * PURPOSE: Passive stance-based feat definition with full prerequisites.
 */

module.exports = {
  id: "agile_maneuvers",
  name: "Agile Maneuvers",
  category: "combat",
  type: "feat",
  description: "You use your Dexterity instead of Strength for combat maneuvers.",
  
  prerequisites: { attributes: { dex: 13 } },
  stanceEffects: {
    base: {},
    aggressive: {},
    defensive: {},
    perceptive: {}
  },
  hooks: {
    onAttack(ctx) {
      const { actor, engine } = ctx;
      if (!actor) return;
      engine.addBonus({ type: "maneuver_ability_override", key: "dex", amount: 1, source: "agile_maneuvers" });
    }
  }
};

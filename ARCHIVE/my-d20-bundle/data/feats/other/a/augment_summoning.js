// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/augment_summoning.js
 * PURPOSE: Passive stance-based feat definition with full prerequisites and summon-boosting logic.
 */

module.exports = {
  id: "augment_summoning",
  name: "Augment Summoning",
  description: "Your summoned creatures are more powerful than normal.",
  category: "magic",
  prerequisites: { feats: ["spell_focus_conjuration"], spellcasting: { arcane: true, level: 3 } },
  stanceEffects: {
    base: {},
    aggressive: {},
    defensive: {},
    perceptive: {}
  },
  hooks: {
    onRoundStart(ctx) {
      const { actor, engine } = ctx;
      if (!actor || !actor.summons) return;
      for (const creature of actor.summons) {
        engine.addBonus({ type: "attack", key: "melee", amount: 1, source: "augment_summoning" });
        engine.addBonus({ type: "damage", key: "melee", amount: 1, source: "augment_summoning" });
      }
    }
  }
};

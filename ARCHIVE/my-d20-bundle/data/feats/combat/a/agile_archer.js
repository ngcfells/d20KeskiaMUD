// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Quintessential Ranger (Mongoose Publishing)
 
/**
* BUNDLE: feats
* PATH: bundles/feats/a/agile_archer.js
* PURPOSE: Passive stance based feat definition with full hook logic.
*/
 
module.exports = {
  id: "agile_archer",
  name: "Agile Archer",
  category: "combat",
  type: "feat",
  description: "You combine agility with archery skill, gaining bonuses to ranged attacks while moving.",

  prerequisites: {
    dex: 13,
    feats: ["point_blank_shot"],
    skills: { tumble: 3 }
  },

  stanceEffects: {
    base: {},
    aggressive: {},
    defensive: {},
    perceptive: {}
  },

  hooks: {
    onAttack(ctx) {
      const { actor, weapon, stance, engine } = ctx;
      if (!weapon || weapon.category !== "ranged") return;
      if (!actor.flags?.movedThisRound) return;

      const amount = stance === "aggressive" ? 2 : 1;

      engine.addBonus({
        type: "attack",
        key: "ranged",
        amount,
        source: "agile_archer"
      });
    },

    onMove(ctx) {
      const { actor } = ctx;
      actor.flags = actor.flags || {};
      actor.flags.movedThisRound = true;
    },

    onRoundStart(ctx) {
      const { actor } = ctx;
      if (!actor.flags) return;
      actor.flags.movedThisRound = false;
    }
  }
};

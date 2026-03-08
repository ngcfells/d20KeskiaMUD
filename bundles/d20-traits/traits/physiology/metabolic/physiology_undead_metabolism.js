'use strict';

module.exports = {
  config: {
    name: "Physiology: Undead Metabolism",
    description: "A metabolism sustained by necrotic energy rather than biology.",
    type: "trait",
    family: "physiology_undead_metabolism",
    unique: true,
    persists: true
  },

  state: {
    staminaBonus: 0,
    fatigueRate: -5,
    necroticStabilityBonus: +4
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.fatigueRate === "number") r.fatigueRate = current.fatigueRate + state.fatigueRate;
      if (typeof current.necroticStability === "number") r.necroticStability = current.necroticStability + state.necroticStabilityBonus;
      return r;
    }
  }
};

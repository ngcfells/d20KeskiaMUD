'use strict';

module.exports = {
  config: {
    name: "Physiology: Undead-Adjacent",
    description: "A physiology partially sustained by necrotic energy.",
    type: "trait",
    family: "physiology_undead_adjacent",
    unique: true,
    persists: true
  },

  state: {
    necroticRegenBonus: +2,
    vitalityBonus: -1,
    stabilityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.necroticRegen === "number") r.necroticRegen = current.necroticRegen + state.necroticRegenBonus;
      if (typeof current.vitality === "number") r.vitality = current.vitality + state.vitalityBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Necrotic Regeneration",
    description: "Regeneration sustained by necrotic energy.",
    type: "trait",
    family: "physiology_necrotic_regeneration",
    unique: true,
    persists: true
  },

  state: {
    necroticRegenBonus: +5,
    stabilityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.necroticRegen === "number") r.necroticRegen = current.necroticRegen + state.necroticRegenBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      return r;
    }
  }
};

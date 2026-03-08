'use strict';

module.exports = {
  config: {
    name: "Physiology: Force Regeneration",
    description: "Regeneration sustained by the Force.",
    type: "trait",
    family: "physiology_force_regeneration",
    unique: true,
    persists: true
  },

  state: {
    forceRegenBonus: +4,
    regenBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.forceRegen === "number") r.forceRegen = current.forceRegen + state.forceRegenBonus;
      if (typeof current.regen === "number") r.regen = current.regen + state.regenBonus;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Psionic Regeneration",
    description: "Regeneration driven by psionic force.",
    type: "trait",
    family: "physiology_psionic_regeneration",
    unique: true,
    persists: true
  },

  state: {
    psiRegenBonus: +4,
    regenBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.psiRegen === "number") r.psiRegen = current.psiRegen + state.psiRegenBonus;
      if (typeof current.regen === "number") r.regen = current.regen + state.regenBonus;
      return r;
    }
  }
};

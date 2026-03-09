'use strict';

module.exports = {
  config: {
    name: "Physiology: Nanofluid Circulation",
    description: "A circulatory system composed of nanofluid and micro‑repair agents.",
    type: "trait",
    family: "physiology_nanofluid_circulation",
    unique: true,
    persists: true
  },

  state: {
    bleedImmunity: true,
    durabilityRegenBonus: +3,
    naniteResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.bleedImmunity) r.bleedImmunity = true;
      if (typeof current.durabilityRegen === "number") r.durabilityRegen = current.durabilityRegen + state.durabilityRegenBonus;
      if (typeof current.naniteResist === "number") r.naniteResist = current.naniteResist + state.naniteResistBonus;
      return r;
    }
  }
};

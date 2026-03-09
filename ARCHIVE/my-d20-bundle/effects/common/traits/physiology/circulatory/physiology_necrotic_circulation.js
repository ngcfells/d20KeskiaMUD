'use strict';

module.exports = {
  config: {
    name: "Physiology: Necrotic Circulation",
    description: "A necrotic energy circulation system replacing blood flow.",
    type: "trait",
    family: "physiology_necrotic_circulation",
    unique: true,
    persists: true
  },

  state: {
    bleedImmunity: true,
    necroticRegenBonus: +3,
    radiantVulnerabilityBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.bleedImmunity) r.bleedImmunity = true;
      if (typeof current.necroticRegen === "number") r.necroticRegen = current.necroticRegen + state.necroticRegenBonus;
      if (typeof current.radiantVulnerability === "number") r.radiantVulnerability = current.radiantVulnerability + state.radiantVulnerabilityBonus;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Celestial Vessel",
    description: "A physiology infused with celestial or radiant essence.",
    type: "trait",
    family: "physiology_celestial_vessel",
    unique: true,
    persists: true
  },

  state: {
    radiantRegenBonus: +3,
    stabilityBonus: +3,
    vitalityBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.radiantRegen === "number") r.radiantRegen = current.radiantRegen + state.radiantRegenBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      if (typeof current.vitality === "number") r.vitality = current.vitality + state.vitalityBonus;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Earth Affinity",
    description: "Innate resonance with stone and minerals, improving stability and tremor awareness.",
    type: "trait",
    family: "physiology_earth_affinity",
    unique: true,
    persists: true
  },

  state: {
    stabilityBonus: +2,
    tremorSenseBonus: +2,
    mineralAttunementBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      if (typeof current.tremorSense === "number") r.tremorSense = current.tremorSense + state.tremorSenseBonus;
      if (typeof current.mineralAttunement === "number") r.mineralAttunement = current.mineralAttunement + state.mineralAttunementBonus;
      return r;
    }
  }
};

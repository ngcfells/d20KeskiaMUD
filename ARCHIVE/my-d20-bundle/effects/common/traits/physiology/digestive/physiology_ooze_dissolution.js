'use strict';

module.exports = {
  config: {
    name: "Physiology: Ooze Dissolution",
    description: "A physiology that dissolves and absorbs organic matter directly.",
    type: "trait",
    family: "physiology_ooze_dissolution",
    unique: true,
    persists: true
  },

  state: {
    dissolutionDigestBonus: +5,
    toxinResistBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.dissolutionDigest === "number") r.dissolutionDigest = current.dissolutionDigest + state.dissolutionDigestBonus;
      if (typeof current.toxinResist === "number") r.toxinResist = current.toxinResist + state.toxinResistBonus;
      return r;
    }
  }
};

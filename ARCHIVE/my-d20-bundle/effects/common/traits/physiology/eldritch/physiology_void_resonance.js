'use strict';

module.exports = {
  config: {
    name: "Physiology: Void Resonance",
    description: "A physiology harmonized with void or eldritch entropy.",
    type: "trait",
    family: "physiology_void_resonance",
    unique: true,
    persists: true
  },

  state: {
    entropyResistBonus: +3,
    voidAffinityBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.entropyResist === "number") r.entropyResist = current.entropyResist + state.entropyResistBonus;
      if (typeof current.voidAffinity === "number") r.voidAffinity = current.voidAffinity + state.voidAffinityBonus;
      return r;
    }
  }
};

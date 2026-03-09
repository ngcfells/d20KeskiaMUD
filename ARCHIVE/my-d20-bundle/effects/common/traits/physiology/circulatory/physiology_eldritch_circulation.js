'use strict';

module.exports = {
  config: {
    name: "Physiology: Eldritch Circulation",
    description: "A circulatory system based on entropic or non-Euclidean energy flow.",
    type: "trait",
    family: "physiology_eldritch_circulation",
    unique: true,
    persists: true
  },

  state: {
    bleedImmunity: true,
    entropyRegenBonus: +3,
    madnessResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.bleedImmunity) r.bleedImmunity = true;
      if (typeof current.entropyRegen === "number") r.entropyRegen = current.entropyRegen + state.entropyRegenBonus;
      if (typeof current.madnessResist === "number") r.madnessResist = current.madnessResist + state.madnessResistBonus;
      return r;
    }
  }
};

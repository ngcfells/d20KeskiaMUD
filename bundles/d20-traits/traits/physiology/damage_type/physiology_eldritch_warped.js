'use strict';

module.exports = {
  config: {
    name: "Physiology: Eldritch-Warped",
    description: "A physiology twisted by non-Euclidean forces.",
    type: "trait",
    family: "physiology_eldritch_warped",
    unique: true,
    persists: true
  },

  state: {
    entropyResistBonus: +5,
    psychicResistBonus: +2,
    radiantVulnerability: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.entropyResist === "number") r.entropyResist = current.entropyResist + state.entropyResistBonus;
      if (typeof current.psychicResist === "number") r.psychicResist = current.psychicResist + state.psychicResistBonus;
      if (state.radiantVulnerability) r.radiantVulnerability = true;
      return r;
    }
  }
};

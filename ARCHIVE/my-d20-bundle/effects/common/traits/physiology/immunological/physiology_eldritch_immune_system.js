'use strict';

module.exports = {
  config: {
    name: "Physiology: Eldritch Immune System",
    description: "A physiology warped by eldritch forces, resisting entropy and madness.",
    type: "trait",
    family: "physiology_eldritch_immune_system",
    unique: true,
    persists: true
  },

  state: {
    entropyResistBonus: +4,
    corruptionResistBonus: +3,
    madnessResistBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.entropyResist === "number") r.entropyResist = current.entropyResist + state.entropyResistBonus;
      if (typeof current.corruptionResist === "number") r.corruptionResist = current.corruptionResist + state.corruptionResistBonus;
      if (typeof current.madnessResist === "number") r.madnessResist = current.madnessResist + state.madnessResistBonus;
      return r;
    }
  }
};

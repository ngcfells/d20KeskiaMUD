'use strict';

module.exports = {
  config: {
    name: "Physiology: Eldritch Carapace",
    description: "A dermal layer warped by non-Euclidean forces.",
    type: "trait",
    family: "physiology_eldritch_carapace",
    unique: true,
    persists: true
  },

  state: {
    entropyResistBonus: +4,
    naturalArmorBonus: +3,
    radiantVulnerabilityBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.entropyResist === "number") r.entropyResist = current.entropyResist + state.entropyResistBonus;
      if (typeof current.naturalArmor === "number") r.naturalArmor = current.naturalArmor + state.naturalArmorBonus;
      if (typeof current.radiantVulnerability === "number") r.radiantVulnerability = current.radiantVulnerability + state.radiantVulnerabilityBonus;
      return r;
    }
  }
};

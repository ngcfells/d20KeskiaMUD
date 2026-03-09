'use strict';

module.exports = {
  config: {
    name: "Physiology: Chitinous Exoskeleton",
    description: "A hardened exoskeleton made of layered chitin.",
    type: "trait",
    family: "physiology_chitinous_exoskeleton",
    unique: true,
    persists: true
  },

  state: {
    naturalArmorBonus: +3,
    piercingResistBonus: +2,
    bludgeoningVulnerabilityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.naturalArmor === "number") r.naturalArmor = current.naturalArmor + state.naturalArmorBonus;
      if (typeof current.piercingResist === "number") r.piercingResist = current.piercingResist + state.piercingResistBonus;
      if (typeof current.bludgeoningVulnerability === "number") r.bludgeoningVulnerability = current.bludgeoningVulnerability + state.bludgeoningVulnerabilityBonus;
      return r;
    }
  }
};

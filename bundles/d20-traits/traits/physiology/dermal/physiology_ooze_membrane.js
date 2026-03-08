'use strict';

module.exports = {
  config: {
    name: "Physiology: Ooze Membrane",
    description: "A semi-fluid dermal membrane that absorbs and disperses force.",
    type: "trait",
    family: "physiology_ooze_membrane",
    unique: true,
    persists: true
  },

  state: {
    bludgeoningResistBonus: +3,
    slashingVulnerabilityBonus: +2,
    piercingVulnerabilityBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.bludgeoningResist === "number") r.bludgeoningResist = current.bludgeoningResist + state.bludgeoningResistBonus;
      if (typeof current.slashingVulnerability === "number") r.slashingVulnerability = current.slashingVulnerability + state.slashingVulnerabilityBonus;
      if (typeof current.piercingVulnerability === "number") r.piercingVulnerability = current.piercingVulnerability + state.piercingVulnerabilityBonus;
      return r;
    }
  }
};

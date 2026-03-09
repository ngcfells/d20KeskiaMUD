'use strict';

module.exports = {
  config: {
    name: "Physiology: Magma Dermis",
    description: "A dermal layer of igneous, magma-hardened stone with ember-like fissures. Provides exceptional protection against heat and physical force, but is vulnerable to sudden cold.",
    type: "trait",
    family: "physiology_magma_dermis",
    unique: true,
    persists: true
  },

  state: {
    fireResistBonus: +4,
    bludgeoningResistBonus: +2,
    coldVulnerabilityBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.fireResist === "number")
        r.fireResist = current.fireResist + state.fireResistBonus;

      if (typeof current.bludgeoningResist === "number")
        r.bludgeoningResist = current.bludgeoningResist + state.bludgeoningResistBonus;

      if (typeof current.coldVulnerability === "number")
        r.coldVulnerability = current.coldVulnerability + state.coldVulnerabilityBonus;

      return r;
    }
  }
};

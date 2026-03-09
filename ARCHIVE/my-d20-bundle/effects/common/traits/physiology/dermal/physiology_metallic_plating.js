'use strict';

module.exports = {
  config: {
    name: "Physiology: Metallic Plating",
    description: "A dermal layer composed of interlocking metallic plates. Provides exceptional protection against slashing and piercing attacks, moderate resistance to bludgeoning, and increased vulnerability to lightning due to conductive surfaces.",
    type: "trait",
    family: "physiology_metallic_plating",
    unique: true,
    persists: true
  },

  state: {
    slashingResistBonus: +4,
    piercingResistBonus: +3,
    bludgeoningResistBonus: +1,
    lightningVulnerabilityBonus: +3,
    armorBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      // Resistances
      if (typeof current.slashingResist === "number")
        r.slashingResist = current.slashingResist + state.slashingResistBonus;

      if (typeof current.piercingResist === "number")
        r.piercingResist = current.piercingResist + state.piercingResistBonus;

      if (typeof current.bludgeoningResist === "number")
        r.bludgeoningResist = current.bludgeoningResist + state.bludgeoningResistBonus;

      // Vulnerabilities
      if (typeof current.lightningVulnerability === "number")
        r.lightningVulnerability = current.lightningVulnerability + state.lightningVulnerabilityBonus;

      // Armor bonus (natural armor equivalent)
      if (typeof current.armor === "number")
        r.armor = current.armor + state.armorBonus;

      return r;
    }
  }
};

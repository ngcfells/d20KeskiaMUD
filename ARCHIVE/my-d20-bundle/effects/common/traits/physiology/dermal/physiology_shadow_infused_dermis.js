'use strict';

module.exports = {
  config: {
    name: "Physiology: Shadow-Infused Dermis",
    description: "A dermal layer infused with shadowstuff, absorbing light and heat.",
    type: "trait",
    family: "physiology_shadow_infused_dermis",
    unique: true,
    persists: true
  },

  state: {
    radiantVulnerabilityBonus: +2,
    coldResistBonus: +2,
    stealthBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.radiantVulnerability === "number") r.radiantVulnerability = current.radiantVulnerability + state.radiantVulnerabilityBonus;
      if (typeof current.coldResist === "number") r.coldResist = current.coldResist + state.coldResistBonus;
      if (typeof current.stealth === "number") r.stealth = current.stealth + state.stealthBonus;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Radiant-Infused",
    description: "A physiology infused with radiant energy.",
    type: "trait",
    family: "physiology_radiant_infused",
    unique: true,
    persists: true
  },

  state: {
    radiantResistBonus: +5,
    necroticVulnerability: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.radiantResist === "number") r.radiantResist = current.radiantResist + state.radiantResistBonus;
      if (state.necroticVulnerability) r.necroticVulnerability = true;
      return r;
    }
  }
};

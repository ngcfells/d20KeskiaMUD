'use strict';

module.exports = {
  config: {
    name: "Physiology: Necrotic-Infused",
    description: "A physiology infused with necrotic energy.",
    type: "trait",
    family: "physiology_necrotic_infused",
    unique: true,
    persists: true
  },

  state: {
    necroticResistBonus: +5,
    radiantVulnerability: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.necroticResist === "number") r.necroticResist = current.necroticResist + state.necroticResistBonus;
      if (state.radiantVulnerability) r.radiantVulnerability = true;
      return r;
    }
  }
};

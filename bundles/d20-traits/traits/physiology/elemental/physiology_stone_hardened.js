'use strict';

module.exports = {
  config: {
    name: "Physiology: Stone Hardened",
    description: "Mineral‑dense tissues provide resistance to blunt force, crushing pressure, and collapse hazards.",
    type: "trait",
    family: "physiology_stone_hardened",
    unique: true,
    persists: true
  },

  state: {
    bluntResistBonus: +4,
    crushResistBonus: +3,
    collapseResistBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.bluntResist === "number") r.bluntResist = current.bluntResist + state.bluntResistBonus;
      if (typeof current.crushResist === "number") r.crushResist = current.crushResist + state.crushResistBonus;
      if (typeof current.collapseResist === "number") r.collapseResist = current.collapseResist + state.collapseResistBonus;
      return r;
    }
  }
};

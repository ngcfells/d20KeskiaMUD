'use strict';

module.exports = {
  config: {
    name: "Physiology: Ageless",
    description: "A physiology that does not age after reaching maturity.",
    type: "trait",
    family: "physiology_ageless",
    unique: true,
    persists: true
  },

  state: {
    noAging: true,
    physicalDeclineRate: 0,
    mentalDeclineRate: 0
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.noAging) r.noAging = true;
      if (typeof current.physicalDeclineRate === "number") r.physicalDeclineRate = 0;
      if (typeof current.mentalDeclineRate === "number") r.mentalDeclineRate = 0;
      return r;
    }
  }
};

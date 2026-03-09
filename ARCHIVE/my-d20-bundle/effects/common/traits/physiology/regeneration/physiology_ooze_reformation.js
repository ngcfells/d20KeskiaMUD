'use strict';

module.exports = {
  config: {
    name: "Physiology: Ooze Reformation",
    description: "Amorphous bodies reform from surviving mass.",
    type: "trait",
    family: "physiology_ooze_reformation",
    unique: true,
    persists: true
  },

  state: {
    regenBonus: +3,
    massReformBonus: +4
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.regen === "number") r.regen = current.regen + state.regenBonus;
      if (typeof current.massReform === "number") r.massReform = current.massReform + state.massReformBonus;
      return r;
    }
  }
};

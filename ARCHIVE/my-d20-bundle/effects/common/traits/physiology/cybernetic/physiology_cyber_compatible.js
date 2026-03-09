'use strict';

module.exports = {
  config: {
    name: "Physiology: Cyber Compatible",
    description: "A physiology highly compatible with cybernetic augmentation.",
    type: "trait",
    family: "physiology_cyber_compatible",
    unique: true,
    persists: true
  },

  state: {
    implantToleranceBonus: +3,
    naniteAffinityBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.implantTolerance === "number") r.implantTolerance = current.implantTolerance + state.implantToleranceBonus;
      if (typeof current.naniteAffinity === "number") r.naniteAffinity = current.naniteAffinity + state.naniteAffinityBonus;
      return r;
    }
  }
};

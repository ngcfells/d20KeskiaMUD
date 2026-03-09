'use strict';

module.exports = {
  config: {
    name: "Physiology: Horror Taint",
    description: "Exposure to extradimensional horrors warps the body and mind, granting resilience to fear and corruption.",
    type: "trait",
    family: "physiology_horror_taint",
    unique: true,
    persists: true
  },

  state: {
    fearResist: 2,
    corruptionResist: 2,
    sanityPenalty: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.fearResist === "number")
        r.fearResist = current.fearResist + state.fearResist;

      if (typeof current.corruptionResist === "number")
        r.corruptionResist = current.corruptionResist + state.corruptionResist;

      if (typeof current.sanity === "number")
        r.sanity = current.sanity - state.sanityPenalty;

      return r;
    }
  }
};

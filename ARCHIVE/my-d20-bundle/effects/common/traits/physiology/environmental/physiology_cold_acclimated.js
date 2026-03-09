'use strict';

module.exports = {
  config: {
    name: "Physiology: Cold Acclimated",
    description: "Adapted to arctic climates, reducing cold stress and frost fatigue.",
    type: "trait",
    family: "physiology_cold_acclimated",
    unique: true,
    persists: true
  },

  state: {
    coldResist: 2,
    frostFatigueResist: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.coldResist === "number") r.coldResist = current.coldResist + state.coldResist;
      if (typeof current.frostFatigueResist === "number") r.frostFatigueResist = current.frostFatigueResist + state.frostFatigueResist;
      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Wind Resistant",
    description: "A physiology adapted to high winds and violent gusts. The body maintains stability and balance even in storm conditions.",
    type: "trait",
    family: "physiology_wind_resistant",
    unique: true,
    persists: true
  },

  state: {
    windPenaltyReduction: 2,
    balanceBonus: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.windPenalty === "number")
        r.windPenalty = Math.max(0, current.windPenalty - state.windPenaltyReduction);

      if (typeof current.balance === "number")
        r.balance = current.balance + state.balanceBonus;

      return r;
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Physiology: Enhanced Balance",
    description: "A neuromuscular system optimized for balance and sure-footedness.",
    type: "trait",
    family: "physiology_enhanced_balance",
    unique: true,
    persists: true
  },

  state: {
    balanceBonus: +3,
    tripResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.balance === "number") r.balance = current.balance + state.balanceBonus;
      if (typeof current.tripResist === "number") r.tripResist = current.tripResist + state.tripResistBonus;
      return r;
    }
  }
};

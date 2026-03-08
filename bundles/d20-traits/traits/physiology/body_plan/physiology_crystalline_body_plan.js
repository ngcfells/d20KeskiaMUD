'use strict';

module.exports = {
  config: {
    name: "Physiology: Crystalline Body Plan",
    description: "A rigid, faceted body plan composed of crystalline structures.",
    type: "trait",
    family: "physiology_crystalline_body_plan",
    unique: true,
    persists: true
  },

  state: {
    reachBonus: 0,
    carryBonus: +2,
    stabilityBonus: +5
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.reach === "number") r.reach = current.reach + state.reachBonus;
      if (typeof current.carry === "number") r.carry = current.carry + state.carryBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      return r;
    }
  }
};

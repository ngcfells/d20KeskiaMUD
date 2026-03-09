'use strict';

module.exports = {
  config: {
    name: "Physiology: Non-Euclidean Body Plan",
    description: "A body plan that does not conform to Euclidean geometry.",
    type: "trait",
    family: "physiology_non_euclidean_body_plan",
    unique: true,
    persists: true
  },

  state: {
    reachBonus: +4,
    carryBonus: 0,
    stabilityBonus: +2
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

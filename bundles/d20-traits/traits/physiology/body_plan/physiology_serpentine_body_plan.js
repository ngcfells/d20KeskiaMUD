'use strict';

module.exports = {
  config: {
    name: "Physiology: Serpentine Body Plan",
    description: "A long, flexible body plan without limbs.",
    type: "trait",
    family: "physiology_serpentine_body_plan",
    unique: true,
    persists: true
  },

  state: {
    reachBonus: +5,
    carryBonus: -2,
    stabilityBonus: +1
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

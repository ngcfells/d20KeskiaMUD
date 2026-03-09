'use strict';

module.exports = {
  config: {
    name: "Physiology: Winged Body Plan",
    description: "A body plan incorporating wings as primary or secondary limbs.",
    type: "trait",
    family: "physiology_winged_body_plan",
    unique: true,
    persists: true
  },

  state: {
    reachBonus: +1,
    carryBonus: -1,
    stabilityBonus: -1
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

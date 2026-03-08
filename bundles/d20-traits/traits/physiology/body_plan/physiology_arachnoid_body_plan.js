'use strict';

module.exports = {
  config: {
    name: "Physiology: Arachnoid Body Plan",
    description: "A segmented body with eight limbs.",
    type: "trait",
    family: "physiology_arachnoid_body_plan",
    unique: true,
    persists: true
  },

  state: {
    reachBonus: +1,
    carryBonus: +1,
    stabilityBonus: +4
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

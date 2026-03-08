'use strict';

module.exports = {
  config: {
    name: "Physiology: Humanoid Body Plan",
    description: "A body plan with a torso, two arms, two legs, and a single head.",
    type: "trait",
    family: "physiology_humanoid_body_plan",
    unique: true,
    persists: true
  },

  state: {
    reachBonus: 0,
    carryBonus: 0,
    stabilityBonus: 0
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

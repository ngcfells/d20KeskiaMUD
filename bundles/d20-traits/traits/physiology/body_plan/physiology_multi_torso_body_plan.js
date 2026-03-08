'use strict';

module.exports = {
  config: {
    name: "Physiology: Multi-Torso Body Plan",
    description: "A body plan with multiple fused torsos and limb clusters.",
    type: "trait",
    family: "physiology_multi_torso_body_plan",
    unique: true,
    persists: true
  },

  state: {
    reachBonus: +2,
    carryBonus: +5,
    stabilityBonus: +3
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

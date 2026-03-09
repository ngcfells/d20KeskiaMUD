'use strict';

module.exports = {
  config: {
    name: "Physiology: Quadruped Body Plan",
    description: "A body plan with four primary limbs and a horizontal torso.",
    type: "trait",
    family: "physiology_quadruped_body_plan",
    unique: true,
    persists: true
  },

  state: {
    reachBonus: 0,
    carryBonus: +3,
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

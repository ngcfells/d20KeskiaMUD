'use strict';

module.exports = {
  config: {
    name: "Physiology: Cybernetic Exoskeletal Integration",
    description: "A fused exoskeleton providing structural reinforcement.",
    type: "trait",
    family: "physiology_cybernetic_exoskeletal_integration",
    unique: true,
    persists: true
  },

  state: {
    stabilityBonus: +5,
    durabilityBonus: +3,
    carryBonus: +4
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      if (typeof current.durability === "number") r.durability = current.durability + state.durabilityBonus;
      if (typeof current.carry === "number") r.carry = current.carry + state.carryBonus;
      return r;
    }
  }
};

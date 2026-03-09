'use strict';

module.exports = {
  config: {
    name: "Physiology: Cybernetic Skeletal Reinforcement",
    description: "A reinforced skeletal structure using synthetic or metallic components.",
    type: "trait",
    family: "physiology_cybernetic_skeletal_reinforcement",
    unique: true,
    persists: true
  },

  state: {
    stabilityBonus: +4,
    carryBonus: +3,
    durabilityBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      if (typeof current.carry === "number") r.carry = current.carry + state.carryBonus;
      if (typeof current.durability === "number") r.durability = current.durability + state.durabilityBonus;
      return r;
    }
  }
};

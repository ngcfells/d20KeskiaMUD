'use strict';

module.exports = {
  config: {
    name: "Physiology: Full Cybernetic Integration",
    description: "A physiology where synthetic systems replace most biological structures.",
    type: "trait",
    family: "physiology_full_cybernetic_integration",
    unique: true,
    persists: true
  },

  state: {
    durabilityBonus: +4,
    energyEfficiencyBonus: +3,
    staminaBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.durability === "number") r.durability = current.durability + state.durabilityBonus;
      if (typeof current.energyEfficiency === "number") r.energyEfficiency = current.energyEfficiency + state.energyEfficiencyBonus;
      if (typeof current.stamina === "number") r.stamina = current.stamina + state.staminaBonus;
      return r;
    }
  }
};

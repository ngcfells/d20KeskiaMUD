'use strict';

module.exports = {
  config: {
    name: "Physiology: Construct Metabolism",
    description: "A non-biological power system replacing metabolism.",
    type: "trait",
    family: "physiology_construct_metabolism",
    unique: true,
    persists: true
  },

  state: {
    staminaBonus: +2,
    fatigueRate: -4,
    energyEfficiencyBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.energyEfficiency === "number") r.energyEfficiency = current.energyEfficiency + state.energyEfficiencyBonus;
      if (typeof current.fatigueRate === "number") r.fatigueRate = current.fatigueRate + state.fatigueRate;
      return r;
    }
  }
};

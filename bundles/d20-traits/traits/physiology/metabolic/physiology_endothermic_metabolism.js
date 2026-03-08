'use strict';

module.exports = {
  config: {
    name: "Physiology: Endothermic Metabolism",
    description: "A metabolism that maintains internal temperature through high energy expenditure.",
    type: "trait",
    family: "physiology_endothermic_metabolism",
    unique: true,
    persists: true
  },

  state: {
    staminaBonus: +3,
    fatigueRate: +1,
    coldResistanceBonus: +2,
    heatVulnerability: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.stamina === "number") r.stamina = current.stamina + state.staminaBonus;
      if (typeof current.fatigueRate === "number") r.fatigueRate = current.fatigueRate + state.fatigueRate;
      if (typeof current.coldResistance === "number") r.coldResistance = current.coldResistance + state.coldResistanceBonus;
      return r;
    }
  }
};

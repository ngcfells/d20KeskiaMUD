'use strict';

module.exports = {
  config: {
    name: "Physiology: Enhanced Vitality",
    description: "A physiology with heightened natural vitality and recovery.",
    type: "trait",
    family: "physiology_enhanced_vitality",
    unique: true,
    persists: true
  },

  state: {
    hpRegenBonus: +1,
    fatigueResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.hpRegen === "number") r.hpRegen = current.hpRegen + state.hpRegenBonus;
      if (typeof current.fatigueResist === "number") r.fatigueResist = current.fatigueResist + state.fatigueResistBonus;
      return r;
    }
  }
};

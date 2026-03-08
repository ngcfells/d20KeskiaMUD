'use strict';

module.exports = {
  config: {
    name: "Physiology: Enhanced Lung Capacity",
    description: "Lungs with expanded volume and efficiency, allowing superior oxygen uptake and sustained exertion in thin air.",
    type: "trait",
    family: "physiology_enhanced_lung_capacity",
    unique: true,
    persists: true
  },

  state: {
    enduranceBonus: +2,
    breathHoldBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.endurance === "number")
        r.endurance = current.endurance + state.enduranceBonus;

      if (typeof current.breathHold === "number")
        r.breathHold = current.breathHold + state.breathHoldBonus;

      return r;
    }
  }
};

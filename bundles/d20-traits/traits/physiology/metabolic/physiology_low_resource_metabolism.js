'use strict';

module.exports = {
  config: {
    name: "Physiology: Low Resource Metabolism",
    description: "A metabolism adapted to scarce food, extracting maximum nutrition from minimal intake.",
    type: "trait",
    family: "physiology_low_resource_metabolism",
    unique: true,
    persists: true
  },

  state: {
    hungerRateMultiplier: 0.5,
    starvationResistBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.hungerRateMultiplier === "number") r.hungerRateMultiplier = current.hungerRateMultiplier * state.hungerRateMultiplier;
      if (typeof current.starvationResist === "number") r.starvationResist = current.starvationResist + state.starvationResistBonus;
      return r;
    }
  }
};

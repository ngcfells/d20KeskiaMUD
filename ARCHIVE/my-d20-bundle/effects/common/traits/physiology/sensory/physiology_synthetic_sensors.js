'use strict';

module.exports = {
  config: {
    name: "Physiology: Synthetic Sensors",
    description: "A sensory system composed of synthetic detection arrays.",
    type: "trait",
    family: "physiology_synthetic_sensors",
    unique: true,
    persists: true
  },

  state: {
    perceptionBonus: +3,
    sensorRangeBonus: +40
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.sensorRange === "number") r.sensorRange = current.sensorRange + state.sensorRangeBonus;
      if (typeof current.perception === "number") r.perception = current.perception + state.perceptionBonus;
      return r;
    }
  }
};

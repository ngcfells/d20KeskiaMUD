'use strict';

module.exports = {
  config: {
    name: "Physiology: Standard Vision",
    description: "A baseline visual system using visible-spectrum light.",
    type: "trait",
    family: "physiology_standard_vision",
    unique: true,
    persists: true
  },

  state: {
    visionRangeBonus: 0,
    perceptionBonus: 0
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.visionRange === "number") r.visionRange = current.visionRange + state.visionRangeBonus;
      if (typeof current.perception === "number") r.perception = current.perception + state.perceptionBonus;
      return r;
    }
  }
};

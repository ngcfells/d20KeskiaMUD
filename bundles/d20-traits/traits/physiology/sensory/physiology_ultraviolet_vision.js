'use strict';

module.exports = {
  config: {
    name: "Physiology: Ultraviolet Vision",
    description: "A visual system capable of perceiving ultraviolet wavelengths.",
    type: "trait",
    family: "physiology_ultraviolet_vision",
    unique: true,
    persists: true
  },

  state: {
    perceptionBonus: +2,
    uvAwarenessBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.perception === "number") r.perception = current.perception + state.perceptionBonus;
      if (typeof current.uvAwareness === "number") r.uvAwareness = current.uvAwareness + state.uvAwarenessBonus;
      return r;
    }
  }
};

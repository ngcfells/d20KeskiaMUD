'use strict';

module.exports = {
  config: {
    name: "Physiology: Low-Light Adapted",
    description: "Eyes adapted for subterranean environments, granting superior vision in darkness and dim light.",
    type: "trait",
    family: "physiology_low_light_adapted",
    unique: true,
    persists: true
  },

  state: {
    darkvisionBonus: 30,      // +30 ft to darkvision range
    dimLightPerception: 2     // +2 perception in dim light
  },

  modifiers: {
    senses(current, state) {
      const r = {};

      if (typeof current.darkvision === "number")
        r.darkvision = current.darkvision + state.darkvisionBonus;

      if (typeof current.perceptionDimLight === "number")
        r.perceptionDimLight = current.perceptionDimLight + state.dimLightPerception;

      return r;
    }
  }
};

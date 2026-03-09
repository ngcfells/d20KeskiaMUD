'use strict';

module.exports = {
  config: {
    name: "Physiology: Light Sensitive",
    description: "A physiology vulnerable to bright light exposure.",
    type: "trait",
    family: "physiology_light_sensitive",
    unique: true,
    persists: true
  },

  state: {
    lightSensitivityPenalty: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.lightSensitivity === "number") r.lightSensitivity = current.lightSensitivity + state.lightSensitivityPenalty;
      return r;
    }
  }
};

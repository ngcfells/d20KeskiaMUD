'use strict';

module.exports = {
  config: {
    name: "Aquatic Subtype",
    description: "Immunity to drowning and penalties outside water.",
    type: "trait",
    family: "subtype_aquatic",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        if ((effect.config.family || "").toLowerCase() === "suffocation") {
          result.cancel = true;
        }
      };
    },

    modifiers: {
      attributes(current) {
        return {
          reflex: current.reflex - 1
        };
      }
    }
  }
};

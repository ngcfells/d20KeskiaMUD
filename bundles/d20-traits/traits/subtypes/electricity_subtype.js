'use strict';

module.exports = {
  config: {
    name: "Electricity Subtype",
    description: "Immunity to electricity damage.",
    type: "trait",
    family: "subtype_electricity",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        if ((effect.config.family || "").toLowerCase() === "electricity_damage") {
          result.cancel = true;
        }
      };
    }
  }
};

'use strict';

module.exports = {
  config: {
    name: "Ice Subtype",
    description: "Immunity to cold, vulnerability to fire.",
    type: "trait",
    family: "subtype_ice",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        if ((effect.config.family || "").toLowerCase() === "cold_damage") {
          result.cancel = true;
        }
      };
    },

    onIncomingDamage() {
      return data => {
        if (data.type === "fire") data.amount = Math.floor(data.amount * 1.5);
      };
    }
  }
};

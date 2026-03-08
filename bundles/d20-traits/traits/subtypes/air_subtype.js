'use strict';

module.exports = {
  config: {
    name: "Air Subtype",
    description: "Resistance to electricity and immunity to suffocation.",
    type: "trait",
    family: "subtype_air",
    unique: true,
    persists: true
  },

  listeners: {
    onIncomingDamage() {
      return data => {
        if (data.type === "electricity") {
          data.amount = Math.floor(data.amount / 2);
        }
      };
    },

    onEffectAdd() {
      return (effect, result) => {
        if ((effect.config.family || "").toLowerCase() === "suffocation") {
          result.cancel = true;
        }
      };
    }
  }
};

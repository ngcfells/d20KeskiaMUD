'use strict';

module.exports = {
  config: {
    name: "Water Subtype",
    description: "Resistance to cold and immunity to dehydration.",
    type: "trait",
    family: "subtype_water",
    unique: true,
    persists: true
  },

  listeners: {
    onIncomingDamage() {
      return data => {
        if (data.type === "cold") {
          data.amount = Math.floor(data.amount / 2);
        }
      };
    },

    onEffectAdd() {
      return (effect, result) => {
        if ((effect.config.family || "").toLowerCase() === "wasteland_dehydration") {
          result.cancel = true;
        }
      };
    }
  }
};

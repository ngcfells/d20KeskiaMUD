'use strict';

module.exports = {
  config: {
    name: "Cold Subtype",
    description: "Immunity to cold and vulnerability to fire.",
    type: "trait",
    family: "subtype_cold",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const fam = (effect.config.family || "").toLowerCase();
        if (fam === "cold_damage") {
          result.cancel = true;
        }
      };
    },

    onIncomingDamage() {
      return data => {
        if (data.type === "fire") {
          data.amount = Math.floor(data.amount * 1.5);
        }
      };
    }
  }
};

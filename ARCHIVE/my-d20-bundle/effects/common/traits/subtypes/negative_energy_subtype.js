'use strict';

module.exports = {
  config: {
    name: "Negative Energy Subtype",
    description: "Healed by negative energy and harmed by positive energy.",
    type: "trait",
    family: "subtype_negative_energy",
    unique: true,
    persists: true
  },

  listeners: {
    onIncomingDamage() {
      return data => {
        if (data.type === "negative_energy") data.amount = -Math.abs(data.amount);
        if (data.type === "positive_energy") data.amount = Math.abs(data.amount);
      };
    }
  }
};

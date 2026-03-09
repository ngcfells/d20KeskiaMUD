'use strict';

module.exports = {
  config: {
    name: "Positive Energy Subtype",
    description: "Healed by positive energy and harmed by negative energy.",
    type: "trait",
    family: "subtype_positive_energy",
    unique: true,
    persists: true
  },

  listeners: {
    onIncomingDamage() {
      return data => {
        if (data.type === "positive_energy") data.amount = -Math.abs(data.amount);
        if (data.type === "negative_energy") data.amount = Math.abs(data.amount);
      };
    }
  }
};

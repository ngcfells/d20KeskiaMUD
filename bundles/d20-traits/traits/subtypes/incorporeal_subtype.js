'use strict';

module.exports = {
  config: {
    name: "Incorporeal Subtype",
    description: "Reduced physical damage and immunity to nonmagical attacks.",
    type: "trait",
    family: "subtype_incorporeal",
    unique: true,
    persists: true
  },

  listeners: {
    onIncomingPhysicalDamage() {
      return data => {
        if (!data.isMagical) {
          data.amount = 0;
        } else {
          data.amount = Math.floor(data.amount / 2);
        }
      };
    }
  }
};

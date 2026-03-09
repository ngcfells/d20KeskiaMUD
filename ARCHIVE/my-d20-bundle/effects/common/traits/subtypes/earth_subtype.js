'use strict';

module.exports = {
  config: {
    name: "Earth Subtype",
    description: "Resistance to acid and immunity to being moved unwillingly.",
    type: "trait",
    family: "subtype_earth",
    unique: true,
    persists: true
  },

  listeners: {
    onIncomingDamage() {
      return data => {
        if (data.type === "acid") {
          data.amount = Math.floor(data.amount / 2);
        }
      };
    },

    onForcedMovement() {
      return data => {
        data.cancel = true;
      };
    }
  }
};

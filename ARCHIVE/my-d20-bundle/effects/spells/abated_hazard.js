// path: bundles/my-d20-bundle/effects/spells/abated_hazard.js
'use strict';
module.exports = {
  config: {
    name: "Abated Hazard",
    description: "The surrounding environment is less lethal.",
    type: "buff",
    family: "mitigation",
    tier: 1,
    duration: 6000
  },
  // Custom logic to reduce damage processed in this room
  listeners: {
    onRoomDamage(damage) {
       // Reduce all environmental/area damage in the room by 25%
       damage.amount = Math.floor(damage.amount * 0.75);
    }
  }
};

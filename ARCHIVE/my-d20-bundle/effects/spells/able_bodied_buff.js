// path: ./bundles/my-d20-bundle/effects/spells/able_bodied_buff.js
'use strict';
module.exports = {
  config: {
    name: "Able-bodied",
    description: "You ignore the penalties of fatigue and starvation.",
    type: "buff",
    family: "survival",
    tier: 1,
    duration: 86400000
  },
  modifiers: {
    attributes: {
      stamina: 5,
      constitution: 2
    }
  },
  listeners: {
    effectActivated() {
      // Logic: Pause hunger/thirst/fatigue meters if they exist
    }
  }
};

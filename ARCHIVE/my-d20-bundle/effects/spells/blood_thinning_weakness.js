// path: ./bundles/my-d20-bundle/effects/common/blood_thinning_weakness.js
'use strict';
module.exports = {
  config: {
    name: "Systemic Weakness",
    description: "Movement slowed, damage output halved.",
    type: "condition",
    family: "fatigue",
    tier: 4
  },
  modifiers: {
    attributes: { speed: -15 }
  },
  listeners: {
    effectActivated() { this.target.say("<white>Your limbs feel like lead; your blood has no strength left to give.</white>"); },
    // Logical hook for halving damage output would be in the combat-out listener
  }
};

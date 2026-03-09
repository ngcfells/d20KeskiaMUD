// path: ./bundles/my-d20-bundle/effects/liquids/blood_frenzy_effect.js
'use strict';
module.exports = {
  config: {
    name: "Blood Frenzy",
    description: "+2 to hit and +1 damage per die.",
    type: "buff",
    family: "anger",
    tier: 2
  },
  modifiers: {
    attributes: { attack: 2 }
  },
  listeners: {
    effectActivated() { this.target.say("<red>Your vision swims with red! Kill! Feed!</red>"); }
  }
};

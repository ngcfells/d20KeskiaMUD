// path: ./bundles/my-d20-bundle/effects/spells/soothed_mind.js
'use strict';
module.exports = {
  config: {
    name: "Soothed Mind",
    description: "Your nerves are steeled against panic.",
    type: "buff",
    family: "serenity",
    tier: 1,
    duration: 3600000
  },
  modifiers: { attributes: { will: 2 } }, // Specifically for Fear saves
  listeners: {
    effectActivated() {
      this.target.say("<cyan>A serene calm settles over your mind.</cyan>");
    }
  }
};

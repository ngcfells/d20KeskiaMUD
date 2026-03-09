// path: ./bundles/my-d20-bundle/effects/spells/animate_legion_effect.js
'use strict';

module.exports = {
  config: {
    name: "Legionnaire's Zeal",
    description: "Temporary reanimation. Attacks nearest living creatures.",
    type: "buff",
    family: "necromancy",
    tier: 3
  },

  listeners: {
    effectActivated() {
      this.target.addTag('undead');
      this.target.addTag('legionnaire');
    },
    
    // Logic for attacking nearest living target would reside in the NPC's AI/Behavior
    
    effectDeactivated() {
      this.target.say("<yellow>The necrotic spark fails. The bones collapse back into an inert pile.</yellow>");
      this.target.destroy();
    }
  }
};

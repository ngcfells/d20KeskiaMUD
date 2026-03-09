// path: bundles/my-d20-bundle/effects/abyssal_army_active.js
'use strict';

/**
 * Effect for Abyssal Army. 
 * Manages the connection between the caster and the summoned demons.
 */
module.exports = {
  config: {
    name: 'Abyssal Army Leash',
    description: 'You are maintaining a tether to summoned demons.',
    type: 'spell.conjuration',
    unique: true,
    persists: false,
  },
  state: {
    summonedUuids: [],
    treacheryTriggered: false
  },
  listeners: {
    // If the caster dies, the demons either vanish or remain as hostile NPCs
    death: function () {
      if (!this.state.treacheryTriggered) {
        this.remove();
      }
    }
  }
};

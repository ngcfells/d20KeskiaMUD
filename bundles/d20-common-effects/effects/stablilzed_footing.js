// path: bundles/my-d20-bundle/effects/stabilized_footing.js
'use strict';

/**
 * Effect: Stabilized Footing
 *
 * Grants temporary stability on uneven or hazardous terrain.
 * Used in Room 12 (Collapsed Ossuary Wall).
 */

module.exports = {
  config: {
    name: "Stabilized Footing",
    description: "You have found secure footing and can move safely through unstable terrain.",
    duration: 120000 // 2 minutes
  },

  state: {},

  modifiers: {},

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<cyan>Your footing steadies, allowing you to move through the rubble safely.</cyan>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<yellow>Your footing becomes uncertain again as the effect fades.</yellow>");
    }
  }
};

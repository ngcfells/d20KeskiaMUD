// path: bundles/my-d20-bundle/effects/blessing_of_rest.js
'use strict';

module.exports = {
  config: {
    name: "Blessing of Rest",
    description: "A peaceful spirit steadies your soul. +2 Will, +2 Resolve.",
    duration: 600000 // 10 minutes
  },

  state: {},

  modifiers: {
    attributes: {
      will: 2,
      resolve: 2
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<cyan>A calming warmth settles over you as Martha's spirit blesses your path.</cyan>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<white>The blessing fades, leaving only a faint memory of peace.</white>");
    }
  }
};

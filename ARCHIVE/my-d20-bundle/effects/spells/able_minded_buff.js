// path: bundles/my-d20-bundle/effects/spells/able_minded_buff.js
'use strict';

module.exports = {
  config: {
    name: "Able-Minded",
    description: "Heightened mental acuity and stability.",
    type: "buff",
    family: "intellect",
    tier: 1,
    duration: 600000 
  },

  modifiers: {
    attributes: {
      // Integration with your attributes.js
      intelligence: 2,
      wisdom: 2,
      resolve: 2,
      sanity: 10 // Temporary "buffer" to max sanity
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<cyan>Your mental processing speed accelerates.</cyan>");
    },

    /**
     * Listener to mitigate incoming Sanity damage while active
     */
    onSanityDamage(damage) {
      damage.amount = Math.max(1, damage.amount - 2);
      this.target.say("<white>Your fortified mind shruggs off the worst of the mental strain.</white>");
    },

    effectDeactivated() {
      this.target.say("<yellow>The heightened clarity fades, leaving your thoughts feeling heavy and slow once more.</yellow>");
    }
  }
};

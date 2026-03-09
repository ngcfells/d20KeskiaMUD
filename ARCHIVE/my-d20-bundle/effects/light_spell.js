// path: bundles/my-d20-bundle/effects/light_spell.js
'use strict';

/**
 * Effect: Light Spell
 *
 * A bright magical radiance that illuminates darkness.
 * Interacts with rooms that check for magical light sources.
 */

module.exports = {
  config: {
    name: "Light",
    description: "A bright magical radiance illuminates the area around you.",
    duration: 600000 // default fallback (10 minutes)
  },

  state: {},

  modifiers: {
    attributes: {
      perception: 1 // Slight sensory boost
    }
  },

  listeners: {

    effectActivated() {
      const target = this.target;
      target.setMeta('is_light_source', true);
      target.say("<yellow>A bright magical light surrounds you.</yellow>");
    },

    effectDeactivated() {
      const target = this.target;
      target.setMeta('is_light_source', false);
      target.say("<white>The magical light fades away.</white>");
    }
  }
};

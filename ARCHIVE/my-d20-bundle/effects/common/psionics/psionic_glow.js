'use strict';

/**
 * Effect: Psionic Glow (Tier 0)
 * A harmless psionic resonance that produces soft violet light.
 */
module.exports = {
  config: {
    name: "Psionic Glow",
    description: "A soft violet radiance surrounds you, illuminating the darkness.",
    type: "condition",
    family: "psionics",
    tier: 0,
    maxTier: 3,
    duration: 600000, // 10 minutes
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: +1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.setMeta('is_light_source', true);
      player.say("<magenta>A soft psionic glow surrounds you, pushing back the darkness.</magenta>");
    },

    effectDeactivated() {
      const player = this.target;
      player.setMeta('is_light_source', false);
      player.say("<white>The psionic glow fades from your body.</white>");
    }
  }
};

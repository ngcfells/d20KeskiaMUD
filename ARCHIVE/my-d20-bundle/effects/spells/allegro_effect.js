// path: ./bundles/my-d20-bundle/effects/spells/allegro_effect.js
'use strict';

module.exports = {
  config: {
    name: "Allegro",
    description: "+30ft Enhancement bonus to land speed (capped at base speed).",
    type: "buff",
    family: "speed",
    tier: 3
  },

  state: {
    bonus: 30
  },

  modifiers: {
    attributes: {
      /**
       * Enhancement Stacking Logic:
       * Only applies if no higher enhancement bonus (like Haste) is present.
       */
      speed: (target, current) => {
        const hasHaste = target.hasEffect('haste_effect') || target.hasEffect('expeditious_retreat_effect');
        if (hasHaste) return current;
        
        return current + target.effects.get('allegro_effect').state.bonus;
      }
    }
  },

  listeners: {
    updateTick() {
      if (Math.random() > 0.85) {
        this.target.say("<white>The brisk tempo of the magic keeps your pace high.</white>");
      }
    },

    effectDeactivated() {
      this.target.say("<grey>The driving rhythm of the Allegro fades, and your legs feel heavy once more.</grey>");
    }
  }
};

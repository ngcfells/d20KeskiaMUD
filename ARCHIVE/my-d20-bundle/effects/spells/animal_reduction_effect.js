// path: ./bundles/my-d20-bundle/effects/spells/animal_reduction_effect.js
'use strict';

module.exports = {
  config: {
    name: "Animal Reduction",
    description: "Reduced in size. Penalties to STR/CON, bonus to DEX/AC/Attack.",
    type: "buff",
    family: "transmutation",
    tier: 2
  },

  state: {
    originalSize: 'M',
    newSize: 'S',
    mods: {}
  },

  modifiers: {
    attributes: {
      // These are applied dynamically from the state object in effectActivated
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      const mods = this.state.mods;

      // Apply modifiers and ensure no stat drops below 1
      for (const [attr, value] of Object.entries(mods)) {
        const current = target.getAttribute(attr) || 10;
        const finalValue = Math.max(1, current + value);
        // We use a temporary bonus/penalty here
        target.addModifier(attr, value); 
      }

      target.setMeta('size', this.state.newSize);
      
      // Hook for AC and Attack bonuses based on size change
      target.addHook('onCalculateAC', (acData) => {
        acData.addBonus(1, 'size');
      });
      target.addHook('onCalculateAttack', (attackData) => {
        attackData.addBonus(1, 'size');
      });
    },

    effectDeactivated() {
      const target = this.target;
      const mods = this.state.mods;

      // Reverse modifiers
      for (const [attr, value] of Object.entries(mods)) {
        target.removeModifier(attr, value);
      }

      target.setMeta('size', this.state.originalSize);
      target.removeHook('onCalculateAC');
      target.removeHook('onCalculateAttack');

      target.say("<yellow>Your body aches as it rapidly expands back to its natural size.</yellow>");
    }
  }
};

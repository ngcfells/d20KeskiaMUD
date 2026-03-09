// path: ./bundles/my-d20-bundle/effects/spells/mystic_debar_effect.js
'use strict';

module.exports = {
  config: {
    name: "Mystic Debar",
    description: "Anti-magic duality field. Magic crossing the boundary is suppressed.",
    type: "condition",
    family: "abjuration",
    tier: 5
  },

  state: {
    nativeEntities: [],
    nativeItems: []
  },

  listeners: {
    effectActivated() {
      this.target.addTag('mystic_debar_active');
    },

    /**
     * The Core Duality Logic:
     * Intercept spellcasting and item usage.
     */
    onCheckMagicSuppression(context) {
      const entity = context.source;
      const isNative = this.state.nativeEntities.includes(entity.id);
      const isInside = (entity.room === this.target.room);

      // Rule: If Native and stays Inside -> Magic Works.
      // Rule: If Not Native and stays Outside -> Magic Works.
      // Rule: If Native goes Outside -> Suppressed.
      // Rule: If Not Native comes Inside -> Suppressed.
      
      if (isNative !== isInside) {
        context.suppressed = true;
        entity.say("<red>The Mystic Debar severs your connection to the weave!</red>");
      }
    },

    /**
     * Winking Out: Summoned creatures and Incorporeal Undead.
     */
    onEntityBoundaryCross(entity) {
      const isSummoned = entity.hasTag('summoned') || entity.hasTag('incorporeal_undead');
      if (!isSummoned) return;

      const isNative = this.state.nativeEntities.includes(entity.id);
      const isInside = (entity.room === this.target.room);

      if (isNative !== isInside) {
        entity.addTag('winked_out');
        entity.say("<blue>The reality shift forces your essence into a dimensional pocket.</blue>");
        // Logic to hide NPC from room
      } else {
        entity.removeTag('winked_out');
      }
    },

    effectDeactivated() {
      this.target.removeTag('mystic_debar_active');
      this.target.say("<yellow>The invisible barrier around you collapses, and the two halves of reality snap back together.</yellow>");
    }
  }
};

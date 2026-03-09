// path: ./bundles/my-d20-bundle/effects/spells/archive_preservation_effect.js
'use strict';

module.exports = {
  config: {
    name: "Archive Preservation",
    description: "Immune to fire, water, and decay. +10 Hardness.",
    type: "item_buff",
    family: "protection",
    tier: 2
  },

  state: {},

  listeners: {
    effectActivated() {
      const item = this.target;
      item.addTag('immune_fire');
      item.addTag('immune_water_damage');
      item.addTag('immune_natural_decay');
    },

    /**
     * Logic: Damage Interception
     * If the item is attacked, apply the +10 Hardness from metadata.
     */
    onBeforeDamage(damage) {
      const item = this.target;
      const bonus = item.getMeta('hardness_bonus') || 10;
      
      // Reduce incoming damage by the preservation hardness
      damage.amount = Math.max(0, damage.amount - bonus);
      
      if (damage.amount === 0) {
        item.room.broadcast(`<white>The blow slides harmlessly off the reinforced surface of ${item.name}.</white>`);
      }
    },

    /**
     * Logic: Environmental Protection
     * Prevents the 'soggy' or 'burnt' status effects on documents.
     */
    onStatusApplied(status) {
      if (['burnt', 'soggy', 'rotted'].includes(status.name)) {
        status.cancel();
      }
    },

    effectDeactivated() {
      const item = this.target;
      item.removeTag('immune_fire');
      item.removeTag('immune_water_damage');
      item.removeTag('immune_natural_decay');
      item.setMeta('hardness_bonus', Math.max(0, (item.getMeta('hardness_bonus') || 0) - 10));
    }
  }
};

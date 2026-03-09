// path: ./bundles/my-d20-bundle/effects/spells/continual_wounds_curse.js
'use strict';

module.exports = {
  config: {
    name: "Continual Wounds",
    description: "Your wounds cannot heal. All magical and natural recovery fails.",
    type: "condition",
    family: "curse",
    tier: 5,
    maxTier: 5
  },

  state: {},

  listeners: {
    effectActivated() {
      const target = this.target;
      target.addTag('cannot_heal');
      target.addTag('suppress_regeneration');
      target.addTag('suppress_fast_healing');
    },

    /**
     * Intercept all healing events.
     * Logic: In Ranvier, we listen for 'heal' or 'attributeUpdate' 
     * where the delta is positive for health/ability scores.
     */
    onHeal(heal) {
      const target = this.target;
      
      // Cancel the heal amount
      heal.amount = 0;
      
      target.say("<red>The dark curse devours the healing energy! Your wounds remain open and raw.</red>");
      
      // If the heal had a source (like a Cleric), notify them
      if (heal.source) {
        heal.source.say(`<red>Your magic washes over ${target.name} but finds no purchase; the curse is too strong.</red>`);
      }
    },

    /**
     * Prevent natural recovery during ticks (Stamina/Health)
     */
    updateTick() {
      // Logic to ensure standard regeneration scripts are bypassed
    },

    effectDeactivated() {
      const target = this.target;
      target.removeTag('cannot_heal');
      target.removeTag('suppress_regeneration');
      target.removeTag('suppress_fast_healing');
      
      target.say("<green>The heavy, entropic weight of the curse finally dissolves. You feel your blood beginning to warm and clot once more.</green>");
    }
  }
};

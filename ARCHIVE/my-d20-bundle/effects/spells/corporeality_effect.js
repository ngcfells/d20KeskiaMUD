// path: ./bundles/my-d20-bundle/effects/spells/corporeality_effect.js
'use strict';

module.exports = {
  config: {
    name: "Corporeal State",
    description: "Forced into a physical form. Loses incorporeal traits and special attacks.",
    type: "condition",
    family: "binding",
    tier: 3,
    maxTier: 5
  },

  state: {},

  modifiers: {
    attributes: {
      // Stripping the "Incorporeal" AC bonus which is usually CHA-based deflection
      // We set a flat penalty to represent the vulnerability
      armorKinetic: -4, 
      reflex: -2,
      speed: -10
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      // Mechanical logic to strip incorporeal traits
      target.addTag('is_corporeal');
      target.removeTag('incorporeal');
      target.removeTag('gaseous_form');
      
      // Suppression of level drain/magic jar logic
      target.addTag('suppress_supernatural_abilities');
    },

    effectDeactivated() {
      const target = this.target;
      target.removeTag('is_corporeal');
      target.removeTag('suppress_supernatural_abilities');
      
      // Check if they were naturally incorporeal to restore tag
      if (target.getMeta('natural_state') === 'incorporeal') {
        target.addTag('incorporeal');
      }

      target.say("<cyan>Your form begins to shimmer and blur as the physical weight lifts.</cyan>");
      target.room.broadcastExcept(target, `<cyan>${target.name} flickers, their form losing its solid definition.</cyan>`);
    },

    /**
     * Logic: Effectively allows non-magical weapons to hit 
     * (Incorporeal usually has 50% miss chance or total immunity)
     */
    incomingDamage(damage) {
       // Since they are now 'is_corporeal', standard combat resolvers 
       // that check for 'incorporeal' will now treat them as a normal physical mob.
    }
  }
};

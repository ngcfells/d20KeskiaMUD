// path: ./bundles/my-d20-bundle/effects/spells/aerial_acceleration_effect.js
'use strict';

module.exports = {
  config: {
    name: "Aerial Acceleration",
    description: "Fly speed increased by 50%. Maneuverability worsened by one step.",
    type: "buff",
    family: "speed",
    tier: 2,
    maxTier: 5
  },

  state: {},

  modifiers: {
    attributes: {
      // Speed is handled by the hook in the spell file
      // We apply a minor reflex penalty to reflect decreased control
      reflex: -1
    }
  },

  listeners: {
    effectActivated() {
      // Logic for expert flyers (High level or specific feats)
      const target = this.target;
      const isExpert = target.getMeta('feat_expert_flyer') || false;
      if (isExpert) {
        target.say("<yellow>Your mastery of flight allows you to maintain control despite the blistering speed.</yellow>");
        // Implementation note: The hook in the spell file would need 
        // to check for this state to skip the maneuverability penalty.
      }
    },

    effectDeactivated() {
      this.target.say("<yellow>The slipstream around you dissipates. You return to your normal cruising speed.</yellow>");
    }
  }
};

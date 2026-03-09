// path: ./bundles/my-d20-bundle/effects/spells/darksight_effect.js
'use strict';

module.exports = {
  config: {
    name: "Darksight",
    description: "You can see in mundane and magical darkness up to 2nd level.",
    type: "buff",
    family: "sensory",
    tier: 3
  },

  state: {},

  listeners: {
    effectActivated() {
      const target = this.target;
      target.addTag('has_darkvision');
      target.addTag('sees_magical_darkness');
      target.setMeta('magical_darkness_threshold', 2); // Can see through Level 2 or lower darkness
    },

    /**
     * Logic: Intercept room descriptions or visibility checks.
     */
    onCheckVisibility(room, visibility) {
      if (room.hasTag('magical_darkness')) {
        const darknessLevel = room.getMeta('darkness_spell_level') || 2;
        if (darknessLevel <= 2) {
          visibility.canSee = true;
          visibility.penalty = 0;
        }
      }
    },

    effectDeactivated() {
      const target = this.target;
      target.removeTag('has_darkvision');
      target.removeTag('sees_magical_darkness');
      target.setMeta('magical_darkness_threshold', null);
      
      target.say("<yellow>The preternatural clarity of your vision fades, leaving you once again at the mercy of the light.</yellow>");
    }
  }
};

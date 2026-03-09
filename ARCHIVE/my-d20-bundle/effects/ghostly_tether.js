// path: bundles/my-d20-bundle/effects/ghostly_tether.js
'use strict';

module.exports = {
  config: {
    name: "Ghostly Tether",
    description: "A spectral chain binds Martha to the confessional.",
    duration: Infinity
  },

  listeners: {
    effectActivated() {
      const npc = this.target;
      npc.setMeta('tethered', true);
    },

    effectDeactivated() {
      const npc = this.target;
      npc.setMeta('tethered', false);

      // Trigger her release cinematic
      npc.emit('freed', npc.lastPlayerInteracted);
    }
  }
};

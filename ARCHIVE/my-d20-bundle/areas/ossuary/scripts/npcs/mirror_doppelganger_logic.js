// path: bundles\my-d20-bundle\areas\ossuary\scripts\npcs\mirror_doppelganger_logic.js

'use strict';

/**
 * NPC script for the Mirror Doppelganger
 * Aligned with 3.5E Attributes + BoEF
 */
module.exports = {
  listeners: {
    spawn: state => function () {
      const npc = this;
      npc.room.broadcast("<italic>The tarnished silver ripples like water as the reflection pulls itself into reality.</italic>");
    },

    hit: state => function (damage, target, attacker) {
      const npc = this;

      // Only fire when the doppelganger hits the player
      if (attacker !== npc) return;

      // 20% chance to deal psychic feedback
      if (Math.random() < 0.2) {
        target.say("<magenta>The doppelganger's face contorts into a scream exactly like yours, but no sound comes out. Your mind reels!</magenta>");

        if (target.hasAttribute('sanity')) {
          target.mutateAttribute('sanity', -2);
        }
        if (target.hasAttribute('resolve')) {
          target.mutateAttribute('resolve', -1);
        }
      }
    },

    death: state => function (killer) {
      const npc = this;
      npc.room.broadcast("<cyan>The shimmering figure shatters into a thousand dull silver shards, vanishing before they hit the floor.</cyan>");
    }
  }
};

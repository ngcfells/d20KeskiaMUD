// path: bundles/my-d20-bundle/areas/ossuary/scripts/npcs/wight_logic.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => function () {
      const wight = this;
      const room = wight.room;

      if (!room) return;
      if (room.players.size === 0) return;

      // Negative energy aura pulse
      for (const p of room.players) {
        p.say("<magenta>The wight's presence drains the warmth from your soul.</magenta>");
        p.mutateAttribute('sanity', -1);
        p.mutateAttribute('health', -1);
      }
    },

    hit: state => function (damage, target, attacker) {
      const wight = this;

      if (attacker !== wight) return;
      if (!target.isPlayer) return;

      // 15% chance to drain stamina
      if (Math.random() < 0.15) {
        target.say("<red>The wight's touch saps your strength!</red>");
        target.mutateAttribute('stamina', -5);
      }
    }
  }
};

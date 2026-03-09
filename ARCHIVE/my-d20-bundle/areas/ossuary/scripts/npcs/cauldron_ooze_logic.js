// path: bundles/my-d20-bundle/areas/ossuary/scripts/npcs/cauldron_ooze_logic.js
'use strict';

module.exports = {
  listeners: {

    hit: state => function (damage, target, attacker) {
      const ooze = this;

      if (attacker !== ooze) return;
      if (!target.isPlayer) return;

      // Acid splash on hit
      target.say("<red>Acidic sludge splashes across your skin!</red>");
      target.mutateAttribute('health', -2);
    },

    damaged: state => function (damage, source) {
      const ooze = this;

      // Slashing weapons cause split (optional)
      if (source && source.metadata && source.metadata.damageType === 'slashing') {
        if (Math.random() < 0.20) {
          const room = ooze.room;
          const spawn = state.MobManager.create(room.area, 'ossuary:cauldron_ooze');
          if (spawn) {
            spawn.moveTo(room);
            room.broadcast("<magenta>The ooze splits into two smaller globs!</magenta>");
          }
        }
      }
    }
  }
};

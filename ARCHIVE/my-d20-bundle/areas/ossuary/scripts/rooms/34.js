// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/34.js
'use strict';

/**
 * Room 34: The Guardian's Post
 * Hazards:
 *  - Skeleton guard awakening
 *  - Chair interaction
 */

module.exports = {
  listeners: {

    command: state => function (commandName, args, player) {
      const room = this;
      const target = (args || '').toLowerCase();

      // Wake skeleton
      if (['touch', 'disturb', 'move'].includes(commandName) &&
          target.includes('skeleton')) {

        const existing = [...room.npcs].find(n => n.id.includes('skeleton_guard'));
        if (existing) {
          player.say("<red>The skeleton rattles violently, rising to attack!</red>");
          existing.initiateCombat(player);
          return true;
        }

        const skel = state.MobManager.create(room.area, 'ossuary:skeleton_guard');
        if (skel) {
          skel.moveTo(room);
          skel.initiateCombat(player);
          player.say("<red>The petrified guardian rises from its stone chair!</red>");
        }

        return true;
      }

      // Examine chair
      if (['examine', 'inspect', 'search'].includes(commandName) &&
          target.includes('chair')) {

        player.say("<white>The massive stone chair is carved with runes of vigilance and duty. A faint warmth lingers on the seat.</white>");
        return true;
      }
    }
  }
};

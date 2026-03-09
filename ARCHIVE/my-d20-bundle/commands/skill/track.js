'use strict';

const { Broadcast } = require('ranvier');

/**
 * TRACK — Follow tracks or signs of passage.
 *
 * Usage:
 *   track
 *   track <target>
 *
 * Behavior:
 *   - If a target is named, attempt to follow that creature's trail.
 *   - If no target is named, attempt to identify any tracks in the area.
 */

module.exports = {
  aliases: ['track'],
  usage: 'track [target]',
  command: state => (player, args) => {
    const skillCheck = state.SkillCheck;
    const synergy = state.Synergy;
    const dcTables = state.DCTables;

    const targetName = args?.trim().toLowerCase() || null;

    const tracks = player.room.getMeta('tracks') || {};

    // If a specific target is named
    if (targetName) {
      const trackInfo = tracks[targetName];
      if (!trackInfo) {
        return Broadcast.sayAt(player, "You don't see any tracks for that target.");
      }

      const specialtyPath = ['tracking'];
      const difficulty = trackInfo.difficulty || 'moderate';

      const dc = dcTables.getDC(player, 'survival', specialtyPath, difficulty);
      const synergyBonus = synergy.getBonus(player, 'survival', specialtyPath);

      const result = skillCheck.check(player, 'survival', specialtyPath, dc, {
        circumstance: synergyBonus
      });

      Broadcast.sayAt(player, `Tracking ${targetName}...`);

      if (!result.success) {
        return Broadcast.sayAt(player, "You lose the trail.");
      }

      // Move player to next room in trail
      const nextRoom = state.RoomManager.getRoom(trackInfo.nextRoom);
      if (nextRoom) {
        player.moveTo(nextRoom);
        Broadcast.sayAt(player, "You follow the tracks to another area.");
      } else {
        Broadcast.sayAt(player, "The tracks lead nowhere you can follow.");
      }

      return;
    }

    // General track identification
    const trackKeys = Object.keys(tracks);
    if (trackKeys.length === 0) {
      return Broadcast.sayAt(player, "You don't see any tracks here.");
    }

    const specialtyPath = ['tracking'];
    const difficulty = 'easy';

    const dc = dcTables.getDC(player, 'survival', specialtyPath, difficulty);
    const synergyBonus = synergy.getBonus(player, 'survival', specialtyPath);

    const result = skillCheck.check(player, 'survival', specialtyPath, dc, {
      circumstance: synergyBonus
    });

    Broadcast.sayAt(player, "Examining the ground for tracks...");

    if (!result.success) {
      return Broadcast.sayAt(player, "You can't make sense of the tracks.");
    }

    Broadcast.sayAt(player, "You identify the following tracks:");
    trackKeys.forEach(k => Broadcast.sayAt(player, ` - ${k}`));
  }
};

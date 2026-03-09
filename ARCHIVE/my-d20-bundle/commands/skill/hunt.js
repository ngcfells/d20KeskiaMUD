'use strict';

const { Broadcast } = require('ranvier');

/**
 * HUNT — Search for wildlife and attempt to bring it down.
 *
 * Usage:
 *   hunt
 *   hunt <creature>
 *
 * Behavior:
 *   - If a creature is named, attempt to locate and engage it.
 *   - If no creature is named, attempt a general hunt roll.
 */

module.exports = {
  aliases: ['hunt'],
  usage: 'hunt [creature]',
  command: state => (player, args) => {
    const skillCheck = state.SkillCheck;
    const synergy = state.Synergy;
    const dcTables = state.DCTables;

    const creatureName = args?.trim().toLowerCase() || null;

    const wildlife = player.room.getMeta('wildlife') || {};

    // Specific creature
    if (creatureName) {
      const creatureInfo = wildlife[creatureName];
      if (!creatureInfo) {
        return Broadcast.sayAt(player, "You don't find signs of that creature.");
      }

      const specialtyPath = ['hunting'];
      const difficulty = creatureInfo.difficulty || 'moderate';

      const dc = dcTables.getDC(player, 'survival', specialtyPath, difficulty);
      const synergyBonus = synergy.getBonus(player, 'survival', specialtyPath);

      const result = skillCheck.check(player, 'survival', specialtyPath, dc, {
        circumstance: synergyBonus
      });

      Broadcast.sayAt(player, `Hunting ${creatureName}...`);

      if (!result.success) {
        return Broadcast.sayAt(player, "You fail to locate your prey.");
      }

      // Spawn creature
      const mob = state.MobFactory.create(creatureInfo.mob);
      mob.hydrate(state);
      player.room.addNpc(mob);

      Broadcast.sayAt(player, `You find a ${mob.name}!`);
      return;
    }

    // General hunt
    const generalTable = player.room.getMeta('huntTable');
    if (!generalTable) {
      return Broadcast.sayAt(player, "There is nothing to hunt here.");
    }

    const specialtyPath = ['hunting'];
    const difficulty = generalTable.difficulty || 'moderate';

    const dc = dcTables.getDC(player, 'survival', specialtyPath, difficulty);
    const synergyBonus = synergy.getBonus(player, 'survival', specialtyPath);

    const result = skillCheck.check(player, 'survival', specialtyPath, dc, {
      circumstance: synergyBonus
    });

    Broadcast.sayAt(player, "Hunting...");

    if (!result.success) {
      return Broadcast.sayAt(player, "You fail to find any prey.");
    }

    // Random creature
    const mobId = generalTable.mobs[Math.floor(Math.random() * generalTable.mobs.length)];
    const mob = state.MobFactory.create(mobId);
    mob.hydrate(state);
    player.room.addNpc(mob);

    Broadcast.sayAt(player, `You find a ${mob.name}!`);
  }
};

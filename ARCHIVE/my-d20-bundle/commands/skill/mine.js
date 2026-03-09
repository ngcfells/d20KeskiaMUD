'use strict';

const { Broadcast } = require('ranvier');

/**
 * MINE — Extract ore from veins
 * Usage:
 *   mine <ore>
 */

module.exports = {
  aliases: ['mine'],
  usage: 'mine <ore>',
  command: state => (player, args) => {
    const skillCheck = state.SkillCheck;
    const synergy = state.Synergy;
    const dcTables = state.DCTables;

    if (!args) {
      return Broadcast.sayAt(player, "Mine what?");
    }

    const vein = player.room.getMeta('veins')?.[args.toLowerCase()];
    if (!vein) {
      return Broadcast.sayAt(player, "There is no vein of that ore here.");
    }

    // Tool requirement
    if (!player.hasItem('tool_pickaxe')) {
      return Broadcast.sayAt(player, "You need a pickaxe to mine ore.");
    }

    const specialtyPath = ['mining'];
    const difficulty = vein.difficulty || 'moderate';

    const dc = dcTables.getDC(player, 'craft', specialtyPath, difficulty);
    const synergyBonus = synergy.getBonus(player, 'craft', specialtyPath);

    const result = skillCheck.check(player, 'craft', specialtyPath, dc, {
      circumstance: synergyBonus
    });

    Broadcast.sayAt(player, `Mining ${args}...`);

    if (!result.success) {
      return Broadcast.sayAt(player, "You fail to extract any ore.");
    }

    const item = state.ItemFactory.create(vein.item);
    player.addItem(item);

    Broadcast.sayAt(player, `You mine ${item.name}.`);
  }
};

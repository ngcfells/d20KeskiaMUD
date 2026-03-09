'use strict';

const { Broadcast } = require('ranvier');

/**
 * SMELT — Process ore into ingots
 * Usage:
 *   smelt <ore>
 */

module.exports = {
  aliases: ['smelt'],
  usage: 'smelt <ore>',
  command: state => (player, args) => {
    const skillCheck = state.SkillCheck;
    const synergy = state.Synergy;
    const dcTables = state.DCTables;

    if (!args) {
      return Broadcast.sayAt(player, "Smelt what?");
    }

    const oreId = `ore_${args.toLowerCase()}`;
    if (!player.hasItem(oreId)) {
      return Broadcast.sayAt(player, "You don't have any of that ore.");
    }

    // Workstation requirement
    if (!player.room.hasWorkstation('workstation_forge')) {
      return Broadcast.sayAt(player, "You need a forge to smelt ore.");
    }

    const specialtyPath = ['metalworking', 'smelting'];
    const difficulty = 'moderate';

    const dc = dcTables.getDC(player, 'craft', specialtyPath, difficulty);
    const synergyBonus = synergy.getBonus(player, 'craft', specialtyPath);

    const result = skillCheck.check(player, 'craft', specialtyPath, dc, {
      circumstance: synergyBonus
    });

    Broadcast.sayAt(player, `Smelting ${args} ore...`);

    if (!result.success) {
      return Broadcast.sayAt(player, "You fail to smelt the ore properly.");
    }

    // Consume ore
    player.removeItem(oreId, 1);

    // Produce ingot
    const ingotId = `ingot_${args.toLowerCase()}`;
    const ingot = state.ItemFactory.create(ingotId);
    player.addItem(ingot);

    Broadcast.sayAt(player, `You smelt ${ingot.name}.`);
  }
};

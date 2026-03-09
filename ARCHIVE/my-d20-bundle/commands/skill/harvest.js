'use strict';

const { Broadcast } = require('ranvier');

/**
 * HARVEST — Gather plants, herbs, crops, fruit, mushrooms
 * Usage:
 *   harvest <resource>
 */

module.exports = {
  aliases: ['harvest'],
  usage: 'harvest <resource>',
  command: state => (player, args) => {
    const skillCheck = state.SkillCheck;
    const synergy = state.Synergy;
    const dcTables = state.DCTables;

    if (!args) {
      return Broadcast.sayAt(player, "Harvest what?");
    }

    const resource = player.room.getMeta('harvestables')?.[args.toLowerCase()];
    if (!resource) {
      return Broadcast.sayAt(player, "You can't harvest that here.");
    }

    const specialtyPath = ['herbalism', 'gathering'];
    const difficulty = resource.difficulty || 'easy';

    const dc = dcTables.getDC(player, 'survival', specialtyPath, difficulty);
    const synergyBonus = synergy.getBonus(player, 'survival', specialtyPath);

    const result = skillCheck.check(player, 'survival', specialtyPath, dc, {
      circumstance: synergyBonus
    });

    Broadcast.sayAt(player, `Harvesting ${args}...`);

    if (!result.success) {
      return Broadcast.sayAt(player, "You fail to harvest anything useful.");
    }

    const item = state.ItemFactory.create(resource.item);
    player.addItem(item);

    Broadcast.sayAt(player, `You harvest ${item.name}.`);
  }
};

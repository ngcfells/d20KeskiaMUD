'use strict';

const { Broadcast } = require('ranvier');

/**
 * COLLECT — Loose minerals, crystals, reagents
 * Usage:
 *   collect <resource>
 */

module.exports = {
  aliases: ['collect'],
  usage: 'collect <resource>',
  command: state => (player, args) => {
    const skillCheck = state.SkillCheck;
    const synergy = state.Synergy;
    const dcTables = state.DCTables;

    if (!args) {
      return Broadcast.sayAt(player, "Collect what?");
    }

    const resource = player.room.getMeta('collectables')?.[args.toLowerCase()];
    if (!resource) {
      return Broadcast.sayAt(player, "You can't collect that here.");
    }

    const specialtyPath = ['wilderness', 'gathering'];
    const difficulty = resource.difficulty || 'moderate';

    const dc = dcTables.getDC(player, 'survival', specialtyPath, difficulty);
    const synergyBonus = synergy.getBonus(player, 'survival', specialtyPath);

    const result = skillCheck.check(player, 'survival', specialtyPath, dc, {
      circumstance: synergyBonus
    });

    Broadcast.sayAt(player, `Collecting ${args}...`);

    if (!result.success) {
      return Broadcast.sayAt(player, "You fail to collect anything useful.");
    }

    const item = state.ItemFactory.create(resource.item);
    player.addItem(item);

    Broadcast.sayAt(player, `You collect ${item.name}.`);
  }
};

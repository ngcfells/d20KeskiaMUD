'use strict';

const { Broadcast } = require('ranvier');

/**
 * FORAGE — Search the environment for natural resources.
 *
 * Usage:
 *   forage
 *   forage <resource>
 *
 * Behavior:
 *   - If a specific resource is named, attempt to gather that.
 *   - If no resource is named, attempt a general forage roll.
 */

module.exports = {
  aliases: ['forage'],
  usage: 'forage [resource]',
  command: state => (player, args) => {
    const skillCheck = state.SkillCheck;
    const synergy = state.Synergy;
    const dcTables = state.DCTables;

    const resourceName = args?.trim().toLowerCase() || null;

    const harvestables = player.room.getMeta('harvestables') || {};

    // If a specific resource is named
    if (resourceName) {
      const resource = harvestables[resourceName];
      if (!resource) {
        return Broadcast.sayAt(player, "You don't find that resource here.");
      }

      const specialtyPath = ['foraging', 'plants'];
      const difficulty = resource.difficulty || 'moderate';

      const dc = dcTables.getDC(player, 'survival', specialtyPath, difficulty);
      const synergyBonus = synergy.getBonus(player, 'survival', specialtyPath);

      const result = skillCheck.check(player, 'survival', specialtyPath, dc, {
        circumstance: synergyBonus
      });

      Broadcast.sayAt(player, `Foraging for ${resourceName}...`);

      if (!result.success) {
        return Broadcast.sayAt(player, "You fail to find anything useful.");
      }

      const item = state.ItemFactory.create(resource.item);
      player.addItem(item);

      return Broadcast.sayAt(player, `You gather ${item.name}.`);
    }

    // General forage (random table)
    const generalTable = player.room.getMeta('forageTable');
    if (!generalTable) {
      return Broadcast.sayAt(player, "There is nothing to forage here.");
    }

    const specialtyPath = ['foraging'];
    const difficulty = generalTable.difficulty || 'moderate';

    const dc = dcTables.getDC(player, 'survival', specialtyPath, difficulty);
    const synergyBonus = synergy.getBonus(player, 'survival', specialtyPath);

    const result = skillCheck.check(player, 'survival', specialtyPath, dc, {
      circumstance: synergyBonus
    });

    Broadcast.sayAt(player, "Foraging...");

    if (!result.success) {
      return Broadcast.sayAt(player, "You fail to find anything useful.");
    }

    // Random pick
    const itemId = generalTable.items[Math.floor(Math.random() * generalTable.items.length)];
    const item = state.ItemFactory.create(itemId);
    player.addItem(item);

    Broadcast.sayAt(player, `You find ${item.name}.`);
  }
};

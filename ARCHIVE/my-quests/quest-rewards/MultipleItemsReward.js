'use strict';

const { QuestReward } = require('ranvier');

/**
 * Quest reward that gives multiple items
 *
 * Config options:
 *   items: array of objects, each with:
 *     - entityReference: string
 *     - quantity: number
 */
module.exports = class MultipleItemsReward extends QuestReward {
  /*
    IMPORTANT: Reward classes are used statically
  */

  static display(GameState, quest, config, player) {
    if (!config.items || !Array.isArray(config.items)) {
      return '';
    }

    const itemDescriptions = config.items.map(itemConfig => {
      const item = GameState.ItemManager.get(itemConfig.entityReference);
      if (item) {
        return `${itemConfig.quantity}x ${item.name}`;
      }
      return `${itemConfig.quantity}x [Unknown Item: ${itemConfig.entityReference}]`;
    });

    return `Items: ${itemDescriptions.join(', ')}`;
  }

  static reward(GameState, quest, config, player) {
    if (!config.items || !Array.isArray(config.items)) {
      return;
    }

    for (const itemConfig of config.items) {
      const item = GameState.ItemManager.create(itemConfig.entityReference);
      if (!item) {
        console.warn(
          `[Quest Reward] Could not find item with entity reference [${itemConfig.entityReference}] for quest [${quest.id}]`
        );
        continue;
      }

      item.quantity = itemConfig.quantity || 1;
      player.addItem(item);

      // Optional: Add feedback to the player
      player.channel(
        'info',
        `You received ${item.quantity}x ${item.name} as a quest reward.`
      );
    }
  }
};

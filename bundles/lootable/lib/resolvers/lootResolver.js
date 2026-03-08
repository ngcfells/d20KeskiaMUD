'use strict';

/**
 * Loot Resolver
 *
 * Handles:
 *  - currency drops
 *  - item pools
 *  - weighted item drops
 *  - global loot pools
 *  - entity inventory injection
 */

class LootResolver {
  constructor(state) {
    this.state = state;
  }

  /**
   * Apply loot to an entity (NPC, item, room, etc.)
   */
  applyLoot(entity, config) {
    if (!config) return;

    //
    // 1. Currencies
    //
    if (config.currencies) {
      for (const [currency, range] of Object.entries(config.currencies)) {
        const amount = this.state.Random.inRange(range.min, range.max);
        if (amount > 0 && entity.addCurrency) {
          entity.addCurrency(currency, amount);
        }
      }
    }

    //
    // 2. Item pools
    //
    if (config.pools) {
      for (const entry of config.pools) {
        // Case A: "area:poolname"
        if (typeof entry === 'string') {
          const pool = this.state.ItemFactory.getDefinition(entry);
          if (pool && pool.items) {
            for (const itemRef of pool.items) {
              const item = this.state.ItemFactory.create(this.state, itemRef);
              entity.addItem?.(item);
            }
          }
          continue;
        }

        // Case B: { "area:itemref": chance }
        if (typeof entry === 'object') {
          const [itemRef, chance] = Object.entries(entry)[0];
          const roll = this.state.Random.inRange(1, 100);
          if (roll <= chance) {
            const item = this.state.ItemFactory.create(this.state, itemRef);
            entity.addItem?.(item);
          }
        }
      }
    }
  }

  /**
   * Drop all loot into a room (for NPC death, chest opening, etc.)
   */
  dropToRoom(entity, room) {
    if (!room) return;

    // Drop items
    if (entity.inventory) {
      for (const item of [...entity.inventory]) {
        entity.removeItem(item);
        room.addItem(item);
      }
    }

    // Drop currencies
    if (entity.currencies) {
      for (const [currency, amount] of Object.entries(entity.currencies)) {
        if (amount > 0) {
          room.emit('currency', currency, amount, entity);
        }
      }
    }
  }
}

module.exports = LootResolver;

/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/d20/stasis-engine.js
 * PURPOSE: Manages weightlessness and temporal stasis for the Dimensional Stash.
 */
'use strict';

module.exports = {
  /**
   * Main Check: Is this specific item currently inside the Dimensional Stash?
   * @param {Item} item
   * @param {Character} owner
   * @returns {boolean}
   */
  isItemInStasis(item, owner) {
    if (!owner || !owner.inventory) return false;
    
    // True only if the item is a direct child of the player's 20-slot inventory
    return owner.inventory.has(item);
  },

  /**
   * Calculates the recursive weight of an item.
   * If the item is in the Stash, it returns 0 (Weightless).
   * If it's on the Anatomy or in a physical bag, it returns actual weight.
   */
  resolveItemWeight(item, owner) {
    if (this.isItemInStasis(item, owner)) {
      return 0; // Dimensional Stash ignores gravity
    }

    let totalWeight = item.metadata.weight || 0;

    // If it's a physical container (backpack/pouch) not in stasis, add contents
    if (item.inventory && item.inventory.size > 0) {
      for (const [, subItem] of item.inventory) {
        totalWeight += this.resolveItemWeight(subItem, owner);
      }
    }

    return totalWeight;
  },

  /**
   * Resolves the "Aging" or "Decay" of an item.
   * Called by your item-tick logic.
   */
  processItemDecay(item, owner) {
    if (this.isItemInStasis(item, owner)) {
      // TEMPORAL STASIS: Item is frozen in time.
      return false; // Did not decay
    }

    // Standard decay logic: Food rots, coffee cools, batteries drain
    if (item.metadata.decayRate) {
      item.metadata.freshness = Math.max(0, item.metadata.freshness - item.metadata.decayRate);
      return true; // Item aged
    }

    return false;
  }
};

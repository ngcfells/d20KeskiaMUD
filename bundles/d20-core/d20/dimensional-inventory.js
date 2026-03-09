/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/d20/dimensional-inventory.js
 */
'use strict';

module.exports = {
  isFull(character) {
    return character.inventory.size >= 20;
  },

  /**
   * Calculates total weight of equipped gear.
   * Skips 'ioun' slot array per orbital physics rules.
   */
  getCarriedWeight(character) {
    let totalWeight = 0;

    for (const [slot, itemOrArray] of character.equipment) {
      // RULE: Ioun stones orbit the character and have no effective weight.
      if (slot === 'ioun') continue;

      if (Array.isArray(itemOrArray)) {
        // Multi-slot anatomy (fingers, wrists, etc.)
        for (const item of itemOrArray) {
          if (item) totalWeight += this.getItemWeightRecursive(item);
        }
      } else if (itemOrArray) {
        // Single slots (torso, back, etc.)
        totalWeight += this.getItemWeightRecursive(itemOrArray);
      }
    }

    return totalWeight;
  },

  /**
   * Recursive weight for physical containers.
   */
  getItemWeightRecursive(item) {
    let weight = item.metadata.weight || 0;

    if (item.inventory && item.inventory.size > 0) {
      for (const [id, subItem] of item.inventory) {
        weight += this.getItemWeightRecursive(subItem);
      }
    }

    return weight;
  },

  /**
   * Ioun stones are technically 'in the world' and NOT in stasis 
   * unless they are grabbed and put back in the 20-slot stash.
   */
  isInStasis(item, character) {
    return character.inventory.has(item);
  }
};

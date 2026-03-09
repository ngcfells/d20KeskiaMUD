/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/d20/DecayEngine.js
 * PURPOSE: Processes temporal effects (rot, cooling, aging) on items.
 */
'use strict';

const DimensionalInventory = require('./dimensional-inventory');
const ItemUtil = require('../ItemUtil');
const { Broadcast: B } = require('ranvier');

class DecayEngine {
  /**
   * Process a single tick of time for an item's temporal properties.
   * @param {Item} item
   * @param {Character} owner
   */
  processTick(item, owner) {
    // 1. Check for Temporal Stasis (Extra-dimensional Stash Only)
    if (owner && DimensionalInventory.isInStasis(item, owner)) {
      // The item is in the 20-slot stash; it does not age, rot, or cool.
      return;
    }

    // 2. Handle Food/Organic Decay (Freshness)
    if (item.metadata.freshness !== undefined) {
      this._handleOrganicDecay(item, owner);
    }

    // 3. Handle Thermodynamic Change (Heat/Cold loss)
    if (item.metadata.temperature !== undefined) {
      this._handleTemperatureLoss(item, owner);
    }
  }

  /**
   * Reduces freshness over time. If it hits 0, the item rots.
   */
  _handleOrganicDecay(item, owner) {
    item.metadata.freshness -= 1;

    if (item.metadata.freshness === 0) {
      if (owner) {
        B.sayAt(owner, `<red>The ${ItemUtil.display(item)} in your physical pack has rotted away!</red>`);
      }
      // logic to transform item into 'refuse' or destroy it
      item.name = `Rotted ${item.name}`;
      item.metadata.quality = 'poor';
    }
  }

  /**
   * Moves temperature toward ambient (0).
   */
  _handleTemperatureLoss(item, owner) {
    if (item.metadata.temperature > 0) item.metadata.temperature -= 1;
    if (item.metadata.temperature < 0) item.metadata.temperature += 1;

    if (item.metadata.temperature === 0 && owner) {
       // Item reached ambient temp because it wasn't in stasis
       // e.g. "Your Hot Coffee is now room temperature."
    }
  }
}

module.exports = new DecayEngine();

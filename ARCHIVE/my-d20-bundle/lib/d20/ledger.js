/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/d20/ledger.js
 */
'use strict';

const Registry = require('../../data/rules/currency_registry');

class Ledger {
  /**
   * Adds currency to player.
   * @param {Player} player
   * @param {string} currencyId - e.g., 'nuyen'
   * @param {number} amount
   * @param {boolean} toBank - If true, adds to bank instead of wallet
   */
  add(player, currencyId, amount, toBank = false) {
    const metaKey = toBank ? 'bank_ledger' : 'currencies';
    const current = player.getMeta(metaKey) || {};
    
    current[currencyId] = (current[currencyId] || 0) + amount;
    player.setMeta(metaKey, current);
    
    return { name: Registry[currencyId].name, total: current[currencyId] };
  }

  /**
   * Checks if player can afford an item, even with mixed currencies.
   * @param {Player} player
   * @param {number} totalUCValue - The cost in Universal Credits (GP equivalent)
   */
  canAfford(player, totalUCValue) {
    const wallet = player.getMeta('currencies') || {};
    let totalPower = 0;

    for (const [id, amt] of Object.entries(wallet)) {
      if (Registry[id]) {
        totalPower += amt * Registry[id].baseValue;
      }
    }

    return totalPower >= totalUCValue;
  }

  /**
   * Bank Exchange: Determine if a bank accepts a foreign currency.
   */
  getExchangeRate(currencyId, bankRegion) {
    const curr = Registry[currencyId];
    if (!curr) return 0;
    
    // Universal currencies exchange at base value
    if (curr.type === 'universal') return curr.baseValue;
    
    // Local currencies exchange at 100% in their region, 10% elsewhere (Black Market)
    return curr.region === bankRegion ? curr.baseValue : curr.baseValue * 0.1;
  }
}

module.exports = new Ledger();

/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/d20/vendor-logic.js
 */
'use strict';

const Ledger = require('./ledger');
const Registry = require('../../data/rules/currency_registry');

module.exports = {
  /**
   * Calculates how much a player can pay in Universal Credits (UC).
   */
  getPlayerBuyingPower(player) {
    const wallet = player.getMeta('currencies') || {};
    let totalUC = 0;

    for (const [id, amount] of Object.entries(wallet)) {
      if (Registry[id]) {
        totalUC += amount * Registry[id].baseValue;
      }
    }
    return totalUC;
  },

  /**
   * Deducts a UC value from the player, prioritizing the vendor's local currency.
   */
  executePayment(player, costUC, preferredCurrency = 'gp') {
    const wallet = player.getMeta('currencies') || {};
    let remainingCost = costUC;

    // 1. Try to pay with preferred currency first
    if (wallet[preferredCurrency]) {
      const val = Registry[preferredCurrency].baseValue;
      const canPay = Math.min(wallet[preferredCurrency], Math.floor(remainingCost / val));
      wallet[preferredCurrency] -= canPay;
      remainingCost -= (canPay * val);
    }

    // 2. Cascade through other currencies (High value to Low value)
    const sorted = Object.keys(wallet).sort((a, b) => Registry[b].baseValue - Registry[a].baseValue);
    for (const id of sorted) {
      while (remainingCost > 0 && wallet[id] > 0) {
        const val = Registry[id].baseValue;
        wallet[id]--;
        remainingCost -= val;
      }
    }

    player.setMeta('currencies', wallet);
    return remainingCost <= 0;
  }
};

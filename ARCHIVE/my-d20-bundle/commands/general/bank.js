/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/bank.js
 */
'use strict';

const { Broadcast: B } = require('ranvier');
const Ledger = require('../../lib/d20/ledger');

module.exports = {
  usage: 'bank [deposit/withdraw/balance] <amount> <currency>',
  command: state => (args, player) => {
    const room = player.room;
    if (!room.metadata.isBank) {
      return B.sayAt(player, "You must be at a bank to do that.");
    }

    const bankRegion = room.metadata.bankRegion || 'universal';
    const [action, amountStr, currId] = args.split(' ');
    const amount = parseInt(amountStr, 10);

    if (action === 'balance') {
      // Display bank ledger from player meta
      return state.CommandManager.get('score').execute('', player);
    }

    if (action === 'deposit') {
      const wallet = player.getMeta('currencies') || {};
      if (!wallet[currId] || wallet[currId] < amount) {
        return B.sayAt(player, "You don't have that much on you.");
      }

      // Handle Exchange
      const rate = Ledger.getExchangeRate(currId, bankRegion);
      if (rate <= 0) return B.sayAt(player, "This bank does not accept that currency.");

      Ledger.add(player, currId, -amount); // Remove from wallet
      Ledger.add(player, currId, amount, true); // Add to bank
      
      B.sayAt(player, `You deposit ${amount} ${currId}.`);
    }
  }
};

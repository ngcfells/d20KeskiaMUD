/**
 * BUNDLE: commands
 * PATH: bundles/commands/wallet.js
 */
'use strict';

const { Broadcast: B } = require('ranvier');
const Registry = require('../../data/rules/currency_registry');
const VendorLogic = require('../../lib/d20/vendor-logic');

module.exports = {
  usage: 'wallet',
  aliases: ['money', 'coins', 'credits'],
  command: state => (args, player) => {
    const currencies = player.getMeta('currencies') || {};
    const totalUC = VendorLogic.getPlayerBuyingPower(player);

    B.sayAt(player, `<b><cyan>-- Multiversal Wallet --</cyan></b>`);
    
    const held = Object.entries(currencies).filter(([id, amt]) => amt > 0);
    
    if (!held.length) {
      return B.sayAt(player, "Your pockets are empty.");
    }

    held.forEach(([id, amount]) => {
      const data = Registry[id] || { name: id, baseValue: 0 };
      const ucValue = (amount * data.baseValue).toFixed(2);
      B.sayAt(player, `  <white>${data.name.padEnd(15)}</white>: <yellow>${amount.toString().padStart(6)}</yellow> <gray>(${ucValue} UC)</gray>`);
    });

    B.sayAt(player, B.line(40, '-', 'cyan'));
    B.sayAt(player, `<b>Total Buying Power: <green>${totalUC.toFixed(2)} Universal Credits (GP equivalent)</green></b>`);
  }
};

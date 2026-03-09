/**
 * BUNDLE: commands
 * PATH: bundles/commands/sell.js
 */
'use strict';

const ItemUtil = require('../../my-d20-bundle/lib/ItemUtil');
const Registry = require('../../my-d20-bundle/data/rules/currency_registry');

module.exports = srcPath => {
  const { Broadcast: B } = require(srcPath);
  const ArgParser = require('../lib/ArgParser');

  return {
    usage: 'sell <item> <vendor>',
    command: state => (args, player) => {
      if (!args.length) return B.sayAt(player, 'Sell what to whom?');

      const parts = args.split(' ');
      const item = ArgParser.parseDot(parts[0], player.inventory);
      const vendor = ArgParser.parseDot(parts[1], player.room.npcs);

      if (!item) return B.sayAt(player, "You don't have that.");
      if (!vendor || !vendor.hasBehavior('vendor')) return B.sayAt(player, "They aren't buying.");

      // d20 Rule: Vendors buy at 50% value
      const baseValue = item.metadata.value || 0;
      const sellPriceUC = Math.floor(baseValue * 0.5);
      const currencyId = vendor.getMeta('currency_type') || 'gp';
      const localPrice = Math.floor(sellPriceUC / Registry[currencyId].baseValue);

      player.removeItem(item);
      state.ItemManager.remove(item);

      // Add local currency to player wallet
      const wallet = player.getMeta('currencies');
      wallet[currencyId] = (wallet[currencyId] || 0) + localPrice;
      player.setMeta('currencies', wallet);

      B.sayAt(player, `<green>You sell ${ItemUtil.display(item)} for ${localPrice} ${Registry[currencyId].name}.</green>`);
    }
  };
};

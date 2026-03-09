/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/list.js
 * PURPOSE: Lists a vendor's inventory with regional prices and finite stock levels.
 */
'use strict';

const ItemUtil = require('../../lib/ItemUtil');
const Registry = require('../../data/rules/currency_registry');

module.exports = srcPath => {
  const { Broadcast: B } = require(srcPath);
  const ArgParser = require('../../lib/ArgParser');

  return {
    usage: 'list <vendor>',
    command: state => (args, player) => {
      if (!args.length) return B.sayAt(player, 'List whose items?');

      const vendor = ArgParser.parseDot(args, player.room.npcs);
      if (!vendor || !vendor.hasBehavior('vendor')) {
        return B.sayAt(player, "They aren't selling anything.");
      }

      // 1. Data Retrieval
      const vendorConfig = vendor.getMeta('vendor_config') || { items: {} };
      const stock = vendor.getMeta('vendor_stock') || {};
      const currencyId = vendor.getMeta('currency_type') || 'gp';
      const multiplier = vendor.getMeta('vendor_multiplier') || 1.0;
      const currency = Registry[currencyId];

      const itemRefs = Object.keys(vendorConfig.items);

      // 2. Header Rendering
      B.sayAt(player, `<b><yellow>${vendor.name}'s Wares (${currency.name}):</yellow></b>`);
      B.sayAt(player, B.line(60, '-', 'yellow'));

      if (!itemRefs.length) {
        return B.sayAt(player, "  (Sold out)");
      }

      // 3. Item List Rendering
      itemRefs.forEach(itemRef => {
        const itemTemplate = state.ItemFactory.getDefinition(itemRef);
        if (!itemTemplate) return;

        const settings = vendorConfig.items[itemRef];
        const currentStock = stock[itemRef] || 0;
        const maxStock = settings.max || 1;
        
        // Convert Universal Credits to Local Price
        const baseUC = itemTemplate.metadata.value || 10;
        const localPrice = Math.ceil((baseUC * multiplier) / currency.baseValue);
        
        // Stock Indicator [Current/Max]
        const stockColor = currentStock > 0 ? 'white' : 'red';
        const stockDisplay = `[<${stockColor}>${currentStock.toString().padStart(2)}/${maxStock}</${stockColor}>]`;
        
        // Price Display
        const priceDisplay = `${localPrice.toString().padStart(6)} ${currencyId.toUpperCase().padEnd(4)}`;

        B.sayAt(player, ` ${stockDisplay} ${priceDisplay} - ${ItemUtil.display(itemTemplate)}`);
      });

      B.sayAt(player, B.line(60, '-', 'yellow'));
    }
  };
};

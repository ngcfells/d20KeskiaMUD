/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/behaviors/npc/vendor.js
 * PURPOSE: Manages regional currency, markup, and finite stock levels.
 */
'use strict';

module.exports = {
  listeners: {
    /**
     * Setup the vendor's initial state.
     * config: { 
     *   items: { 'limbo:sword': { max: 5, rate: 0.1 }, 'cyber:deck': { max: 1, rate: 0.01 } },
     *   multiplier: 1.2, 
     *   currency: 'nuyen' 
     * }
     */
    setup: state => function (config) {
      // 1. Currency & Pricing Logic
      this.setMeta('currency_type', config.currency || 'gp');
      this.setMeta('vendor_multiplier', config.multiplier || 1.0);
      
      // 2. Inventory Stock Logic
      const items = config.items || {};
      const stock = this.getMeta('vendor_stock') || {};
      
      for (const [ref, settings] of Object.entries(items)) {
        // Initialize current stock to max if not already tracked
        if (stock[ref] === undefined) {
          stock[ref] = settings.max || 1;
        }
      }

      this.setMeta('vendor_config', config);
      this.setMeta('vendor_stock', stock);
      // Compatibility for the 'list' command to find available refs
      this.setMeta('vendor_inventory', Object.keys(items));
    },

    /**
     * Restock Heartbeat: Periodically replenishes sold items.
     */
    updateTick: state => function () {
      const config = this.getMeta('vendor_config');
      const stock = this.getMeta('vendor_stock');
      if (!config || !stock) return;

      let changed = false;
      for (const [ref, settings] of Object.entries(config.items)) {
        if (stock[ref] < settings.max) {
          // 'rate' is the probability (0.0 to 1.0) of 1 unit restocking per tick
          if (Math.random() < (settings.rate || 0.05)) {
            stock[ref]++;
            changed = true;
          }
        }
      }

      if (changed) {
        this.setMeta('vendor_stock', stock);
      }
    },

    /**
     * Flavor: Greet potential customers.
     */
    playerEnter: state => function (player) {
      const { Broadcast: B } = require('ranvier');
      const currency = this.getMeta('currency_type').toUpperCase();
      B.sayAt(player, `${this.name} nods to you. "Looking to spend some ${currency}?" Type 'list ${this.name}' to see my wares.`);
    }
  }
};

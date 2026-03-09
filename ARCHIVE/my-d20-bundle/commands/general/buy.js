/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/buy.js
 * PURPOSE: Robust d20 buy command with Haggle, Stock, Weight, and Forgery detection.
 */
'use strict';

const { Broadcast: B } = require('ranvier');
const ItemUtil = require('../../lib/ItemUtil');
const VendorLogic = require('../../lib/d20/vendor-logic');
const Registry = require('../../data/rules/currency_registry');
const Movement = require('../../lib/d20/movement');
const ArgParser = require('../../lib/ArgParser');

module.exports = {
  usage: 'buy <item> <vendor>',
  command: state => (args, player) => {
    if (!args.length) return B.sayAt(player, 'Buy what from whom?');

    const parts = args.split(' ');
    const itemSearch = parts[0];
    const vendorSearch = parts[1];

    // 1. Resolve Vendor
    const vendor = ArgParser.parseDot(vendorSearch, player.room.npcs);
    if (!vendor || !vendor.hasBehavior('vendor')) {
      return B.sayAt(player, "That person isn't selling anything.");
    }

    // 2. Resolve Multiplier (Haggle Check)
    let finalMultiplier = vendor.getMeta('vendor_multiplier') || 1.0;
    const activeEffects = player.effects.filter(e => e.id === 'haggled_price');
    const haggleEffect = activeEffects.find(e => e.state.vendorId === vendor.uuid);
    if (haggleEffect) finalMultiplier = haggleEffect.state.multiplier;

    // 3. Identify Item and Stock
    const vendorConfig = vendor.getMeta('vendor_config') || { items: {} };
    const itemRef = Object.keys(vendorConfig.items).find(ref => ref.includes(itemSearch));
    if (!itemRef) return B.sayAt(player, "They don't have that for sale.");

    const itemTemplate = state.ItemFactory.getDefinition(itemRef);
    const stock = vendor.getMeta('vendor_stock') || {};
    if (stock[itemRef] <= 0) return B.sayAt(player, "They are sold out.");

    // 4. Financial Calculations
    const baseUC = itemTemplate.metadata.value || 10;
    const finalCostUC = baseUC * finalMultiplier;
    const buyingPower = VendorLogic.getPlayerBuyingPower(player);
    const preferredCurr = vendor.getMeta('currency_type') || 'gp';

    if (buyingPower < finalCostUC) return B.sayAt(player, "You cannot afford that.");

    // --- 5. FORGERY / COUNTERFEIT CHECK ---
    const counterfeits = [...player.inventory].filter(([, i]) => i.getMeta('isCounterfeit'));
    for (const [, fake] of counterfeits) {
      const detectRoll = Math.floor(Math.random() * 20) + 1;
      const vendorSense =
        (vendor.getMeta('skills.sense_motive') || 0) +
        Math.floor(((vendor.getAttribute('wisdom') || 10) - 10) / 2);

      const detectionDC = fake.getMeta('detectionDC') || 15;

      if (detectRoll + vendorSense >= detectionDC) {
        B.sayAt(
          player,
          `<red>${vendor.name} pauses, inspecting a ${fake.name} in your hand. "Wait... this is a forgery!"</red>`
        );
        vendor.emit('detectForgery', player, fake);
        return;
      }
    }

    // 6. Execute Transaction
    if (VendorLogic.executePayment(player, finalCostUC, preferredCurr)) {
      stock[itemRef]--;
      vendor.setMeta('vendor_stock', stock);

      const area = state.AreaManager.getAreaByReference(itemRef);
      const newItem = state.ItemFactory.create(area, itemRef);
      player.addItem(newItem);

      B.sayAt(
        player,
        `<green>You buy ${ItemUtil.display(newItem)} for ${finalCostUC.toFixed(2)} UC.</green>`
      );

      Movement.getEffectiveSpeed(player);
    }
  }
};

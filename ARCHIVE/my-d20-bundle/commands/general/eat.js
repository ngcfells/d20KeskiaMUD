// path: bundles/my-d20-bundle/commands/general/eat.js

'use strict';

const { Broadcast: say } = require('ranvier');
const ArgParser = require('../../lib/ArgParser');
const ItemUtil = require('../../lib/ItemUtil');
const DimensionalInventory = require('../../lib/d20/dimensional-inventory');

module.exports = {
  usage: 'eat <item>',
  command: state => (args, player) => {
    const item = ArgParser.parseDot(args, player.inventory) || 
                 ArgParser.parseDot(args, player.equipment);

    if (!item) return say(player, "You don't have that.");
    if (item.getBehavior('edible') === undefined) return say(player, "You can't eat that.");

    // Check Freshness (Physics applies if NOT in stasis)
    const inStasis = DimensionalInventory.isInStasis(item, player);
    if (!inStasis && item.metadata.freshness <= 0) {
      return say(player, `The ${ItemUtil.display(item)} has rotted! You can't eat it.`);
    }

    say(player, `<cyan>You eat </cyan>${ItemUtil.display(item)}<cyan>.</cyan>`);
    if (inStasis) say(player, "<gray>It tastes remarkably fresh, as if time stood still.</gray>");

    // Apply nourishment/buffs
    const edible = item.getBehavior('edible');
    if (edible.health) {
       player.setAttribute('health', Math.min(player.getMaxAttribute('health'), player.getAttribute('health') + edible.health));
    }

    state.ItemManager.remove(item);
  }
};

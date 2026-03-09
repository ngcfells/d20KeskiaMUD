'use strict';

const { Broadcast: B } = require('ranvier');
const Atonement = require('../../lib/classes/atonement');

/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/atone.js
 * PURPOSE: Restore class purity for fallen characters (Monks, Paladins, etc.)
 */

module.exports = {
  usage: 'atone',
  aliases: ['penance', 'repent'],
  command: state => (args, player) => {
    const playerClass = player.getClass(state);
    
    // 1. Check if the player is actually fallen
    if (!player.getMeta('isFallen')) {
      return B.sayAt(player, "Your soul remains pure; you have no need for atonement at this time.");
    }

    if (!playerClass) {
      return B.sayAt(player, "You do not have a formal path to atone for.");
    }

    // 2. Calculate Tithe (D20 Standard: Level * 500 GP)
    const level = player.getMeta('level') || 1;
    const goldCost = level * 500;
    const currencies = player.getMeta('currencies') || { gp: 0 };

    if (currencies.gp < goldCost) {
      B.sayAt(player, `<red>The heavens demand a tithe of ${goldCost} GP for your transgressions.</red>`);
      return B.sayAt(player, `<red>You currently possess only ${currencies.gp} GP.</red>`);
    }

    // 3. Deduct Currency and Restore Purity
    currencies.gp -= goldCost;
    player.setMeta('currencies', currencies);

    // Call the library method to flip the 'isFallen' bit and restore abilities
    Atonement.atone(player);

    B.sayAt(player, `<green>With a heavy tithe and a contrite heart, your status as a ${playerClass.name} is restored!</green>`);
    B.sayAtExcept(player.room, `${player.name} finishes a deep prayer, and a golden light surrounds them briefly.`, [player]);
  }
};

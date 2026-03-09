/**
 * BUNDLE: commands
 * PATH: bundles/commands/bite.js
 * PURPOSE: General gameplay command not tied to the skill system.
 */

'use strict';

const getTarget = require('./lib/target');

module.exports = {
  usage: 'bite <target>',
  command: state => (args, player) => {
    const target = getTarget(state, player, args.trim());
    if (!target) return player.say('They are not here.');

    player.setMeta('weaponDie', 6);
    player.setMeta('weaponDamageType', 'piercing');

    state.CombatManager.startCombat(player, target);
    player.say(`You bite ${target.name}!`);
  }
};

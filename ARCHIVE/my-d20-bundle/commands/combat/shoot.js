/**
 * BUNDLE: commands
 * PATH: bundles/commands/shoot.js
 * PURPOSE: General gameplay command not tied to the skill system.
 */

'use strict';

const getTarget = require('./lib/target');

module.exports = {
  usage: 'shoot <target>',
  command: state => (args, player) => {
    const target = getTarget(state, player, args.trim());
    if (!target) return player.say('They are not here.');

    player.setMeta('attackMode', 'ranged');
    state.CombatManager.startCombat(player, target);

    player.say(`You shoot at ${target.name}!`);
  }
};

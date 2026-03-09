/**
 * BUNDLE: commands
 * PATH: bundles/commands/feint.js
 * PURPOSE: General gameplay command not tied to the skill system.
 */

'use strict';

const getTarget = require('./lib/target');
const maneuvers = require('../../combat/scripts/maneuvers');

module.exports = {
  usage: 'feint <target>',
  command: state => (args, player) => {
    const target = getTarget(state, player, args.trim());
    if (!target) return player.say('They are not here.');

    const success = maneuvers.rollManeuver(player, target, 'feint');

    if (success) {
      player.say(`You feint ${target.name}, catching them off guard!`);
    } else {
      player.say('Your feint fails.');
    }
  }
};

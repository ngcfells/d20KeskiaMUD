/**
 * BUNDLE: commands
 * PATH: bundles/commands/overrun.js
 * PURPOSE: General gameplay command not tied to the skill system.
 */

'use strict';

const getTarget = require('./lib/target');
const maneuvers = require('../../combat/scripts/maneuvers');

module.exports = {
  usage: 'overrun <target>',
  command: state => (args, player) => {
    const target = getTarget(state, player, args.trim());
    if (!target) return player.say('They are not here.');

    const success = maneuvers.rollManeuver(player, target, 'overrun');

    if (success) {
      player.say(`You overrun ${target.name}!`);
    } else {
      player.say('Your overrun attempt fails.');
    }
  }
};

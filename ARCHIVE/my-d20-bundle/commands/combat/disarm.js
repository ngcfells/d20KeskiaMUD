/**
 * BUNDLE: commands
 * PATH: bundles/commands/disarm.js
 * PURPOSE: General gameplay command not tied to the skill system.
 */

'use strict';

const getTarget = require('./lib/target');
const maneuvers = require('../../combat/scripts/maneuvers');

module.exports = {
  usage: 'disarm <target>',
  command: state => (args, player) => {
    const target = getTarget(state, player, args.trim());
    if (!target) return player.say('They are not here.');

    const success = maneuvers.rollManeuver(player, target, 'disarm');

    if (success) {
      player.say(`You disarm ${target.name}!`);
    } else {
      player.say('Your disarm attempt fails.');
    }
  }
};

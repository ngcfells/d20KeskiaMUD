/**
 * BUNDLE: commands
 * PATH: bundles/commands/trip.js
 * PURPOSE: General gameplay command not tied to the skill system.
 */

'use strict';

const getTarget = require('./lib/target');
const maneuvers = require('../../combat/scripts/maneuvers');

module.exports = {
  usage: 'trip <target>',
  command: state => (args, player) => {
    const target = getTarget(state, player, args.trim());
    if (!target) return player.say('They are not here.');

    const success = maneuvers.rollManeuver(player, target, 'trip');

    if (success) {
      player.say(`You trip ${target.name}!`);
      target.say(`You are tripped by ${player.name}!`);
    } else {
      player.say('Your trip attempt fails.');
    }
  }
};

/**
 * BUNDLE: commands
 * PATH: bundles/commands/sunder.js
 * PURPOSE: General gameplay command not tied to the skill system.
 */

'use strict';

const getTarget = require('./lib/target');
const maneuvers = require('../../combat/scripts/maneuvers');

module.exports = {
  usage: 'sunder <target>',
  command: state => (args, player) => {
    const target = getTarget(state, player, args.trim());
    if (!target) return player.say('They are not here.');

    const success = maneuvers.rollManeuver(player, target, 'sunder');

    if (success) {
      player.say(`You sunder ${target.name}'s equipment!`);
    } else {
      player.say('Your sunder attempt fails.');
    }
  }
};

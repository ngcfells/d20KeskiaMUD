/**
 * BUNDLE: commands
 * PATH: bundles/commands/bullrush.js
 * PURPOSE: General gameplay command not tied to the skill system.
 */

'use strict';

const getTarget = require('./lib/target');
const maneuvers = require('../../combat/scripts/maneuvers');

module.exports = {
  usage: 'bullrush <target>',
  command: state => (args, player) => {
    const target = getTarget(state, player, args.trim());
    if (!target) return player.say('They are not here.');

    const success = maneuvers.rollManeuver(player, target, 'bull_rush');

    if (success) {
      player.say(`You bull rush ${target.name} backwards!`);
      target.say(`${player.name} slams into you and pushes you back!`);
    } else {
      player.say('Your bull rush fails.');
    }
  }
};

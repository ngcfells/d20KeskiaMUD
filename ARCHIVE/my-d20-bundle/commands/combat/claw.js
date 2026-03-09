/**
 * BUNDLE: commands
 * PATH: bundles/commands/claw.js
 * PURPOSE: General gameplay command not tied to the skill system.
 */

'use strict';

const getTarget = require('./lib/target');

module.exports = {
  usage: 'claw <target>',
  command: state => (args, player) => {
    const target = getTarget(state, player, args.trim());
    if (!target) return player.say('They are not here.');

    player.setMeta('weaponDie', 4);
    player.setMeta('weaponDamageType', 'slashing');

    state.CombatManager.startCombat(player, target);
    player.say(`You claw at ${target.name}!`);
  }
};

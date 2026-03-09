/**
 * BUNDLE: commands
 * PATH: bundles/my-d20-bundle/commands/general/examine.js
 * PURPOSE: General gameplay command not tied to the skill system.
 */

'use strict';

const getTarget = require('./lib/target');

module.exports = {
  usage: 'examine <target>',
  command: state => (args, player) => {
    const targetName = args.trim();
    const target = getTarget(state, player, targetName);

    if (!target) {
      return player.say('They are not here.');
    }

    const TrapManager = state.TrapManager;

    // Check room traps
    const roomTraps = player.room.getMeta('traps') || {};
    for (const trap of Object.values(roomTraps)) {
      const isOwner = trap.owner === player.uuid;
      const isSpotter = (trap.spottedBy || []).includes(player.uuid);

      if ((isOwner || isSpotter) && trap.type === targetName.toLowerCase()) {
        player.say(`You examine the ${trap.type} trap:`);
        player.say(` - Status: ${trap.armed ? 'armed' : 'disarmed'}`);
        player.say(` - Type: ${trap.wildlifeTrap ? 'wildlife' : 'combat'}`);
        if (trap.direction) player.say(` - Direction: ${trap.direction}`);
        if (trap.target) player.say(` - Target: ${trap.target}`);
        player.say(` - Detect DC: ${trap.detectDC}`);
        player.say(` - Disarm DC: ${trap.disarmDC}`);
        player.say(` - Trigger DC: ${trap.triggerDC}`);
        return;
      }
    }

    // Check attached traps
    const attachedTraps = target.getMeta && target.getMeta('traps');
    if (attachedTraps) {
      for (const trap of Object.values(attachedTraps)) {
        const isOwner = trap.owner === player.uuid;
        const isSpotter = (trap.spottedBy || []).includes(player.uuid);

        if (isOwner || isSpotter) {
          player.say(`You detect a ${trap.type} trap attached to this object.`);
          return;
        }
      }
    }

    // Default behavior
    target.describe(player);
  }
};

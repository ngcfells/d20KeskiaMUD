// path: ../bundles/my-d20-bundle/input-events/roll-stats.js
'use strict';

const { EventUtil } = require('ranvier');
const D20Utils = require('../lib/d20/D20Utils');

module.exports = {
  event: state => (socket, args) => {
    const say = EventUtil.genSay(socket);
    const write = EventUtil.genWrite(socket);

    // Initial Setup
    if (!args.stats) {
      args.stats = {
        strength: 0, dexterity: 0, constitution: 0,
        intelligence: 0, wisdom: 0, charisma: 0, appearance: 0
      };
      args.statOrder = Object.keys(args.stats);
      args.currentIndex = 0;
      args.totalRerolls = 3;
    }

    const currentStat = args.statOrder[args.currentIndex];
    const roll = D20Utils.rollStat();

    say(`\r\n<yellow>Step 1: Roll for Attributes</yellow>`);
    say(`Current Stat: <bold>${currentStat.toUpperCase()}</bold>`);
    say(`You rolled: <cyan>${roll}</cyan> (Modifier: ${D20Utils.getModifier(roll)})`);
    say(`Rerolls remaining: <magenta>${args.totalRerolls}</magenta>`);
    
    write(`Keep this roll? [y/n]: `);

    socket.once('data', data => {
      data = data.toString().trim().toLowerCase();

      if (data === 'n' && args.totalRerolls > 0) {
        args.totalRerolls--;
        say('<red>Rerolling...</red>');
        return socket.emit('roll-stats', socket, args);
      }

      // Save and move to next
      args.stats[currentStat] = roll;
      args.currentIndex++;

      if (args.currentIndex < args.statOrder.length) {
        return socket.emit('roll-stats', socket, args);
      }

      say('\r\n<green>Attributes Finalized!</green>');
      // Display summary
      for (const [s, v] of Object.entries(args.stats)) {
        say(`${s.padEnd(15)}: ${v}`);
      }

      return socket.emit('choose-gender', socket, args);
    });
  }
};

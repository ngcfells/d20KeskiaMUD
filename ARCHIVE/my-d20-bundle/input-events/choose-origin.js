// path: ../bundles/my-d20-bundle/input-events/choose-origin.js
'use strict';

const { EventUtil } = require('ranvier');

module.exports = {
  event: state => (socket, args) => {
    const say = EventUtil.genSay(socket);
    const write = EventUtil.genWrite(socket);

    // Define your world bases here
    const origins = {
      'fantasy': { name: 'High Fantasy', desc: 'Magic, Steel, and Ancient Myths.', start: 'ossuary:room:0' },
      'modern':  { name: 'd20 Modern',  desc: 'Urban Heroes, Technology, and Shadows.', start: 'ossuary:room:0' },
      'rokugan': { name: 'Oriental Adventures - Fantasy', desc: 'Magic, Steel, and Ancient Myths with Asian influence.', start: 'ossuary:room:0' },
      'starwars':{ name: 'Star Wars',   desc: 'Galactic Conflict and the Force.', start: 'ossuary:room:0' },
      'warhammer40k': { name: 'Warhammer 40K', desc: 'In the 40th Millenium there is only war. Welcome to the grimdark future.', start: 'ossuary:room:0' },
      'isekai':  { name: 'Isekai',     desc: 'A soul transported from another realm.', start: 'ossuary:room:0' }
    };

    say('\r\n<yellow>Select Character Origin:</yellow>');
    Object.entries(origins).forEach(([id, data]) => {
      say(`[<cyan>${id.padEnd(10)}</cyan>] <bold>${data.name.padEnd(15)}</bold>`);
    });
    write('> ');

    socket.once('data', data => {
      const choice = data.toString().trim().toLowerCase();
      if (!origins[choice]) return socket.emit('choose-origin', socket, args);

      args.origin = choice;
      args.startingRoom = origins[choice].start;
      
      return socket.emit('roll-stats', socket, args);
    });
  }
};

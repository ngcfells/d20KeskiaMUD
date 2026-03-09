// path: ../bundles/my-d20-bundle/input-events/choose-alignment.js
'use strict';

const { EventUtil } = require('ranvier');

module.exports = {
  event: state => (socket, args) => {
    const say = EventUtil.genSay(socket);
    const write = EventUtil.genWrite(socket);

    const alignments = [
      'lawful_good', 'neutral_good', 'chaotic_good',
      'lawful_neutral', 'true_neutral', 'chaotic_neutral',
      'lawful_evil', 'neutral_evil', 'chaotic_evil'
    ];

    say('\r\n<yellow>Choose your Alignment:</yellow>');
    alignments.forEach(align => say(`[<cyan>${align}</cyan>]`));
    write('> ');

    socket.once('data', data => {
      const choice = data.toString().trim().toLowerCase();
      if (!alignments.includes(choice)) {
        return socket.emit('choose-alignment', socket, args);
      }

      // Map selection to grid mid-points
      const gridMap = {
        lawful_good: { o: 85, m: 85 },
        true_neutral: { o: 50, m: 50 },
        chaotic_evil: { o: 15, m: 15 },
        // ... fill in other mappings ...
      };
      
      const coords = gridMap[choice] || { o: 50, m: 50 };
      args.stats.alignment_order = coords.o;
      args.stats.alignment_morality = coords.m;
      args.alignment = choice;
      // Now that we have alignment, we can proceed to choose-class
      return socket.emit('choose-class', socket, args);
    });
  }
};

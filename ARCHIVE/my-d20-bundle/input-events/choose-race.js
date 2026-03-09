// path: ../bundles/my-d20-bundle/input-events/choose-race.js
'use strict';

const { Broadcast, EventUtil } = require('ranvier');

module.exports = {
  event: state => (socket, args) => {
    const say = EventUtil.genSay(socket);
    const write = EventUtil.genWrite(socket);

    // Filter by origin (fantasy, modern, starwars, etc.)
    const baseRaces = state.RaceManager.getByOrigin(args.origin || 'fantasy');
    
    if (!args.tempBaseRace) {
      say('\r\n<yellow>Select your Race</yellow>');
      say('--------------------------------------------------');
      
      if (baseRaces.length === 0) {
        say(`<red>No races found for the origin: ${args.origin}</red>`);
        return socket.emit('choose-origin', socket, args);
      }

      baseRaces.forEach(r => say(
        `[<cyan>${r.id}</cyan>] <bold>${r.name}</bold> - ${r.description}`
      ));
      write('> ');

      socket.once('data', choice => {
        choice = choice.toString().trim().toLowerCase();
        if (!choice) return socket.emit('choose-race', socket, args);

        const selection = baseRaces.find(
          r => r.id === choice || r.name.toLowerCase().includes(choice)
        );

        if (!selection) {
          say('<red>Invalid race choice.</red>');
          return socket.emit('choose-race', socket, args);
        }

        // Sub-races inherit parent origin
        const subRaces = typeof state.RaceManager.getSubRaces === 'function'
          ? state.RaceManager.getSubRaces(selection.id)
          : [];
        
        if (subRaces.length > 0) {
          args.tempBaseRace = selection;
          return socket.emit('choose-race', socket, args);
        }

        args.race = selection.id;
        say(`\r\n<green>Race selected: ${selection.name}</green>`);
        return socket.emit('choose-class', socket, args);
      });
    } else {
      // Sub-race Selection logic
      const subs = state.RaceManager.getSubRaces(args.tempBaseRace.id);
      say(`\r\n<yellow>Select a subtype of ${args.tempBaseRace.name}</yellow>`);
      subs.forEach(s => say(
        `[<cyan>${s.id}</cyan>] <bold>${s.name}</bold> - ${s.description}`
      ));
      write('> ');

      socket.once('data', choice => {
        choice = choice.toString().trim().toLowerCase();
        if (!choice) return socket.emit('choose-race', socket, args);

        const selection = subs.find(
          s => s.id === choice || s.name.toLowerCase().includes(choice)
        );
        if (!selection) {
          say('<red>Invalid sub-type choice.</red>');
          return socket.emit('choose-race', socket, args);
        }

        args.race = selection.id;
        say(`\r\n<green>Sub-race selected: ${selection.name}</green>`);
        return socket.emit('choose-class', socket, args);
      });
    }
  }
};

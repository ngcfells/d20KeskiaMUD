// path: ../bundles/my-d20-bundle/input-events/choose-class.js
'use strict';

const { Broadcast, EventUtil } = require('ranvier');
const PlayerClass = require('../lib/classes/PlayerClass');

/**
 * Player class selection event
 * Filters classes based on the 'origin' selected in choose-origin.js
 */
module.exports = {
  event: state => (socket, args) => {
    const say = EventUtil.genSay(socket);
    const write = EventUtil.genWrite(socket);

    say('\r\n<yellow>Pick your Class</yellow>');
    say('--------------------------');

    // Use getClassesByOrigin (matching the metadata in modern_charismatic_hero.js)
    // args.origin was set during the choose-origin event
    let classes = PlayerClass.getClassesByOrigin(args.origin || 'fantasy');
    
    const classEntries = Object.entries(classes).map(([id, instance]) => {
      return [id, instance.config];
    });

    if (classEntries.length === 0) {
      say(`<red>No classes found for the origin: ${args.origin}</red>`);
      // Fallback or debug: allow them to pick again if a genre is empty
      return socket.emit('choose-origin', socket, args);
    }

    for (const [id, config] of classEntries) {
      say(`[<cyan>${id}</cyan>] - <bold>${config.name}</bold>`);
      if (config.description) {
        say(Broadcast.wrap(`      ${config.description}\r\n`, 80));
      }
    }
    
    write('> ');

    socket.once('data', choice => {
      choice = choice.toString().trim().toLowerCase();

      if (!choice) {
        return socket.emit('choose-class', socket, args);
      }

      const selection = classEntries.find(([id, config]) => {
        return id === choice || config.name.toLowerCase().includes(choice);
      });

      if (!selection) {
        say('<red>Invalid class choice.</red>');
        return socket.emit('choose-class', socket, args);
      }

      // Store the class ID for the resolvers in finish-player
      args.playerClass = selection[0];
      
      say(`\r\n<green>Class selected: ${selection[1].name}</green>`);

      // Proceed to Skill Selection
      return socket.emit('choose-skills', socket, args);
    });
  }
};

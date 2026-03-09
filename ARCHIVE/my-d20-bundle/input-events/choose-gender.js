// path: ../bundles/my-d20-bundle/input-events/choose-gender.js
'use strict';

const { EventUtil } = require('ranvier');

module.exports = {
  event: state => (socket, args) => {
    const say = EventUtil.genSay(socket);
    const write = EventUtil.genWrite(socket);

    say('\r\n<yellow>Step 2: Choose Gender</yellow>');
    say('[<bold>M</bold>]ale, [<bold>F</bold>]emale, [<bold>O</bold>]ther');
    write('> ');

    socket.once('data', data => {
      data = data.toString().trim().toLowerCase();
      
      const genders = { m: 'Male', f: 'Female', o: 'Other' };
      if (!genders[data]) {
        say('<red>Invalid choice.</red>');
        return socket.emit('choose-gender', socket, args);
      }

      args.gender = genders[data];
      return socket.emit('choose-alignment', socket, args);
    });
  }
};

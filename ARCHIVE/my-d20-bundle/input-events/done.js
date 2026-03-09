'use strict';

const { Broadcast, Logger } = require('ranvier');
const PlayerClass = require('../lib/classes/PlayerClass');

module.exports = {
  event: state => (socket, args) => {
    let player = args.player;
    player.hydrate(state);

    player.playerClass = PlayerClass.get(player.getMeta('class'));

    // Class modifications (attributes, prompt, etc.)
    player.playerClass.setupPlayer(state, player);

    // APPLY ALL TRAITS (racial + class + physiology + background)
    state.TraitResolver.apply(state, player);

    player.save();

    player._lastCommandTime = Date.now();

    state.CommandManager.get('look').execute(null, player);

    Broadcast.prompt(player);

    player.socket.emit('commands', player);

    player.emit('login');
  }
};

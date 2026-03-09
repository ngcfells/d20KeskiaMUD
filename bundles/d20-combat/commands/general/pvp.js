'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  usage: 'pvp',
  aliases: ['togglepvp'],
  command: state => (args, player) => {

    const current = player.getMeta('pvp') || false;
    const next = !current;

    player.setMeta('pvp', next);

    if (next) {
      B.sayAt(player, "You are now able to enter into player‑on‑player duels.");
    } else {
      B.sayAt(player, "You are now a pacifist and cannot enter player‑on‑player duels.");
    }
  }
};

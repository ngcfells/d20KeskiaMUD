'use strict';

module.exports = {
  aliases: [ 'loot' ],
  usage: 'loot <corpse>',
  command: state => (args, player) => {

    if (!args || !args.length) {
      return player.say("Loot what?");
    }

    // Try to find the corpse by intuitive targeting
    const target = player.room.findItem(player, args);

    if (!target) {
      return player.say("You don't see that here.");
    }

    if (!target.hasBehavior('lootable')) {
      return player.say("You can't loot that.");
    }

    // Fire the loot event on the corpse
    target.emit('loot', player);
  }
};

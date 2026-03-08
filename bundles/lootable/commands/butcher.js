'use strict';

module.exports = {
  aliases: [ 'harvest' ],
  usage: 'harvest <corpse>',
  command: state => (args, player) => {

    if (!args || !args.length) {
      return player.say("Harvest what?");
    }

    const target = player.room.findItem(player, args);

    if (!target) {
      return player.say("You don't see that here.");
    }

    if (!target.hasBehavior('lootable')) {
      return player.say("You can't harvest that.");
    }

    target.emit('harvest', player);
  }
};

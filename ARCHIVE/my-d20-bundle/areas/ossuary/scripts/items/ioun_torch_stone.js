// path: bundles\my-d20-bundle\areas\ossuary\scripts\items\ioun_torch_stone.js

'use strict';

module.exports = {
  listeners: {
    equip: state => function (player) {
      player.say("<cyan>You release the stone. It begins to orbit your head, casting a steady light around you.</cyan>");
      player.room.broadcastExcept(player, `A dull grey stone begins to orbit ${player.name}'s head.`);
    },
    unequip: state => function (player) {
      player.say("<yellow>You reach up and snatch the stone out of the air.</yellow>");
    }
  }
};

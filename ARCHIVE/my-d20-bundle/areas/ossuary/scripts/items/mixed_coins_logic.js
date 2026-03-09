// path: bundles\my-d20-bundle\areas\ossuary\scripts\items\mixed_coins_logic.js

'use strict';

module.exports = {
  listeners: {
    command: state => function (commandName, args, player) {
      if (!['count', 'sort', 'examine'].includes(commandName)) return;

      player.say("<yellow>You sit for a moment, meticulously sorting the tarnished coins...</yellow>");

      // 3.5E Low-Level Table (Randomized)
      const cp = Math.floor(Math.random() * 30) + 20;
      const sp = Math.floor(Math.random() * 15) + 5;
      const gp = Math.floor(Math.random() * 2); // Max 2 GP

      player.say(`\n<white>Your sorting yields: ${cp} copper pieces, ${sp} silver pieces, and ${gp} gold pieces.</white>`);
      
      player.emit('gainCurrency', { cp, sp, gp });
      state.ItemManager.remove(this);

      player.say("<green>You tuck the coins into your purse and discard the grime-covered scrap metal.</green>");
      
      // Remove the 'mixed_coins' item from inventory
      state.ItemManager.remove(this);
    }
  }
};

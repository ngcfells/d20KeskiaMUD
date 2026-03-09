// path: bundles\my-d20-bundle\areas\ossuary\scripts\items\glass_ball_logic.js

'use strict';

module.exports = {
  listeners: {
    command: function (state) {
      return function (player, commandName, args) {
        const item = this;

        // Only respond if the player is interacting with THIS item
        if (!args || !args.match(/\bball\b/i)) return;

        // Already broken?
        if (item.getMeta('broken')) {
          return player.say("The shattered remains of the glass ball can no longer be used.");
        }

        // --- BREAKING THE BALL ---
        if (['break', 'shatter'].includes(commandName)) {

          player.say("<red>You smash the glass ball against the stone floor! Shards fly everywhere.</red>");
          player.room.broadcastExcept(player, `<red>${player.name} smashes a glass ball, sending shards flying!</red>`);

          // Release the Ioun Stone (if container behavior exists)
          const container = item.getBehavior('container');
          if (container) {
            const stone = [...container.items][0];
            if (stone) {
              stone.moveTo(player.room);
              player.say("<cyan>A dull grey stone rises from the shards and begins to orbit slowly.</cyan>");
            }
          }

          item.setMeta('broken', true);

          // Destroy the item
          player.removeItem(item);
          item.destroy();

          return true;
        }

        // --- LOOKING AT THE BALL ---
        if (commandName === 'look') {
          player.say(item.description);
          player.say("<yellow>The stone inside provides a steady, flickering light through the glass.</yellow>");
          return true;
        }
      };
    }
  }
};

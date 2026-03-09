// path: bundles\my-d20-bundle\areas\ossuary\scripts\items\translucent_beetles.js

'use strict';

module.exports = {
  listeners: {
    use: state => function (args, player) {
      const room = player.room;

      // Ensure the player actually has the item
      if (!player.hasItem(this)) {
        return player.say("You need to be holding the beetles to use them.");
      }

      // Find a valid target (prefer rats)
      const npcs = [...room.npcs];
      const target =
        npcs.find(npc => npc.id.includes('dire_rat')) ||
        npcs[0];

      if (!target) {
        return player.say("You wave the squirming beetles around, but nothing here seems interested in eating them.");
      }

      // Dire Rat logic
      if (target.id.includes('dire_rat')) {
        player.say(`<green>You toss the translucent beetles to ${target.name}. It lunges for them, crunching the insects happily.</green>`);
        target.setMeta('is_friendly', true);
        room.broadcastExcept(player, `${player.name} feeds some beetles to the rat, calming the beast.`);

        // Remove the item safely
        player.removeItem(this, true);
        return;
      }

      // Generic NPC reaction
      player.say(`You offer the beetles to ${target.name}, but they don't seem interested in insect snacks.`);
    }
  }
};

// path: ./bundles/my-d20-bundle/effects/spells/advanced_illusion_effect.js
'use strict';

module.exports = {
  config: {
    name: "Advanced Illusion",
    description: "A complex scripted figment. Will save to disbelieve.",
    type: "environmental",
    family: "illusion",
    tier: 4
  },

  state: {
    dc: 15,
    revealedTo: [] // List of IDs who have successfully disbelieved
  },

  listeners: {
    /**
     * Logic: When a player interacts with the room, they may trigger a save.
     */
    roomEntry(player) {
      if (this.state.revealedTo.includes(player.id)) return;

      player.say("<magenta>The scene before you is remarkably vivid, complete with shifting temperatures and the scent of the environment.</magenta>");
    },

    /**
     * Disbelief Logic: If a player uses 'look' or 'examine' on the illusion.
     */
    onExamine(player, target) {
      if (this.state.revealedTo.includes(player.id)) return;

      let currentDC = this.state.dc;

      // 2E/3.5 Conversion: +4 bonus if someone else has already disbelieved and shared
      if (this.state.revealedTo.length > 0) {
        player.say("<cyan>Someone points out a flickering inconsistency in the scene...</cyan>");
        currentDC -= 4;
      }

      const saveRoll = Math.floor(Math.random() * 20) + 1 + (player.getMeta('save_will') || 0);

      if (saveRoll >= currentDC) {
        player.say("<green>You focus your mind, and the reality of the illusion shatters. The scene becomes a translucent, ghostly outline.</green>");
        this.state.revealedTo.push(player.id);
        player.room.broadcastExcept(player, `${player.name} shouts: "It's an illusion! Don't let it fool you!"`);
      } else {
        player.say("<red>You study the scene closely, but it remains stubbornly real to your eyes.</red>");
      }
    }
  }
};

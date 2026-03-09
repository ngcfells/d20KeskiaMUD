// path: bundles/my-d20-bundle/scripts/items/permanent_bone_legs.js
'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  listeners: {
    /**
     * Logic: When the caster dies, the first person to touch the legs 
     * becomes the new commander.
     */
    get: state => function (player) {
      const currentMaster = this.getMeta('master');
      
      if (!currentMaster) {
        this.setMeta('master', player.id);
        B.sayAt(player, "<magenta>As you touch the cold bone, a spark of violet light leaps to your hand. The legs click-clack in a subservient bow; you are their new master.</magenta>");
      } else if (currentMaster !== player.id) {
        B.sayAt(player, "<red>The bone legs skitter away from your reach, loyal only to their current master.</red>");
        return false; // Prevent pick-up
      }
    },

    /**
     * Mounting/Riding Logic
     */
    sit: state => function (player) {
      if (this.getMeta('master') !== player.id) {
        B.sayAt(player, "<red>The legs kick out at you defensively!</red>");
        return;
      }
      B.sayAt(player, "<cyan>You settle onto the pelvis. The skeletal structure feels surprisingly sturdy as it prepares to carry you.</cyan>");
      player.addTag('mounted_bone_legs');
    },

    /**
     * Movement Sync
     */
    roomEntry: state => function (room) {
      const masterId = this.getMeta('master');
      const master = state.PlayerManager.getPlayer(masterId);
      
      if (master && master.room !== this.room) {
        // Simple logic to stay with master if they move
        this.moveTo(master.room);
      }
    }
  }
};

'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  config: {
    name: "Adrenaline Surge Aura",
    description: "Your summoned creatures are bolstered by your presence.",
    type: "buff.aura",
    family: "nature",
    tier: 2,
    duration: 6000
  },

  state: {
    radius: 25,
    affectedUuids: new Set()
  },

  listeners: {
    /**
     * Heartbeat: Scan for the caster's summons in the room.
     */
    updateTick() {
      const caster = this.target;
      const state = this.gameState;
      const { radius, affectedUuids } = this.state;

      // In a MUD, we typically treat the "Room" as the Close Range area, 
      // but we can check room metadata if it's a 'Large' room.
      for (const mob of caster.room.npcs) {
        // Logic: Is it a summon? Does it belong to this caster?
        const isSummon = mob.hasTag('summoned');
        const ownerUuid = mob.getMeta('summonerUuid');
        
        if (isSummon && ownerUuid === caster.uuid) {
          if (!affectedUuids.has(mob.uuid)) {
            const buff = state.EffectFactory.create('adrenaline_surge_strength', {
              duration: this.remaining,
              state: { auraUuid: this.id }
            });
            
            mob.addEffect(buff);
            affectedUuids.add(mob.uuid);
            
            B.sayAt(mob, "<red>You feel a surge of raw, bestial power from your master!</red>");
          }
        }
      }

      // Cleanup: If a summon leaves the room or the caster leaves
      affectedUuids.forEach(uuid => {
        const mob = state.MobManager.getMob(uuid);
        if (!mob || mob.room !== caster.room) {
          mob.removeEffect('adrenaline_surge_strength');
          affectedUuids.delete(uuid);
        }
      });
    }
  }
};

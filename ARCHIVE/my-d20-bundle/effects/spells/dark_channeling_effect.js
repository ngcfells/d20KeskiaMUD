// path: ./bundles/my-d20-bundle/effects/spells/dark_channeling_effect.js
'use strict';

module.exports = {
  config: {
    name: "Dark Channeling",
    description: "Your psyche is inhabiting this undead host.",
    type: "condition",
    family: "possession",
    tier: 5
  },

  state: {
    casterId: null,
    rangeLimit: 440
  },

  listeners: {
    effectActivated() {
      const host = this.target;
      host.addTag('possessed_by_caster');
      host.setMeta('player_pilot_id', this.state.casterId);
      
      // MUD Logic: Link player input to NPC output
      // caster.setMeta('active_vessel', host.id);
    },

    /**
     * Range Check: If the host moves too far from the caster's body.
     */
    onMove() {
      const host = this.target;
      const caster = host.room.findPlayerById(this.state.casterId);
      // Logic to calculate distance from 'originalRoomId'
    },

    /**
     * Death Risk: If the host is destroyed.
     */
    onDeath() {
      const caster = this.target.room.findPlayerById(this.state.casterId);
      if (!caster) return;

      caster.say("<red><bold>YOUR HOST IS DESTROYED! YOUR SOUL SCREAMS IN THE VOID!</bold></red>");
      
      const saveRoll = Math.floor(Math.random() * 20) + 1 + (caster.getMeta('save_will') || 0);
      if (saveRoll < 20) {
        caster.emit('death'); // Spirit destroyed
      } else {
        caster.addEffect(this.state.EffectFactory.create('stunned', { duration: 60000 }));
        this.remove();
      }
    },

    effectDeactivated() {
      const host = this.target;
      host.removeTag('possessed_by_caster');
      host.setMeta('player_pilot_id', null);
    }
  }
};

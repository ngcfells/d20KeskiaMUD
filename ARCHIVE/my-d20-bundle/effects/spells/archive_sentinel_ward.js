// path: ./bundles/my-d20-bundle/effects/spells/archive_sentinel_ward.js
'use strict';

module.exports = {
  config: {
    name: "Archive Sentinel",
    description: "Item is warded. Theft triggers an alarm and Bestow Curse.",
    type: "item_ward",
    family: "protection",
    tier: 4
  },

  state: {
    casterId: null,
    originRoomId: null,
    targetName: ''
  },

  listeners: {
    /**
     * Logic: When the item is picked up (Get)
     */
    get(player) {
      if (player.id === this.state.casterId) {
        player.say("<cyan>The ward recognizes your touch and remains dormant.</cyan>");
        return;
      }
      player.say("<red>A cold, prickly sensation crawls up your arm as you grasp the object.</red>");
    },

    /**
     * Logic: Displacement Check
     * Triggered if the item enters a new room.
     */
    onMove(newRoom) {
      const item = this.target;
      const holder = item.owner;

      if (!holder || holder.id === this.state.casterId) return;

      if (newRoom.id !== this.state.originRoomId) {
        this.triggerSentinel(state, holder, newRoom);
      }
    },

    triggerSentinel(state, thief, room) {
      const caster = state.PlayerManager.getPlayerById(this.state.casterId);
      
      // 1. Mental Alarm
      if (caster) {
        caster.say(`<bold><red>SENTINEL ALERT: ${this.state.targetName} has been moved from its archive by ${thief.name}!</red></bold>`);
      }

      // 2. Bestow Curse Logic
      thief.say("<bold><red>A jagged sigil flares on the object! Dark energy lashes out, searing your very soul!</red></bold>");
      
      // We apply a standard 'Bestow Curse' effect (Tier 4)
      const curse = state.EffectFactory.create('bestow_curse_effect', {
        state: { 
          statPenalty: -6, 
          targetStat: 'strength' // Or random
        }
      });
      thief.addEffect(curse);

      room.broadcastExcept(thief, `<red>A purple flash erupts from the object in ${thief.name}'s hands, leaving them stumbling and withered.</red>`);
    },

    effectDeactivated() {
      const item = this.target;
      item.setMeta('warded_by', null);
      item.setMeta('home_room', null);
    }
  }
};

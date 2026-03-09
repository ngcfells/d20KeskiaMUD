// path: ./bundles/my-d20-bundle/effects/spells/alarm_ward_effect.js
'use strict';

module.exports = {
  config: {
    name: "Alarm Ward",
    description: "Monitoring for intruders. Triggers audible or mental alert.",
    type: "environmental",
    family: "abjuration",
    tier: 1
  },

  state: {
    casterId: null,
    mode: 'mental',
    whitelist: []
  },

  listeners: {
    /**
     * Engine Hook: Room Entry
     * Triggered whenever an entity enters the room.
     */
    onEntityEnter(entity) {
      const room = this.target; // Room effect
      
      // 1. Filter Whitelist and Size
      if (this.state.whitelist.includes(entity.id)) return;
      if (entity.getMeta('size_category') === 'Fine' || entity.getMeta('size_category') === 'Diminutive') return;

      // 2. d20 Bypass Rules
      if (entity.hasTag('ethereal')) return;

      // 3. Trigger Alert
      if (this.state.mode === 'audible') {
        this.triggerAudibleAlert(room);
      } else {
        this.triggerMentalAlert(state, room, entity);
      }
    },

    triggerAudibleAlert(room) {
      room.broadcast("<bold><red>A sudden, sharp ringing of a silver bell explodes through the room!</red></bold>");
      
      // Wake up characters in the room
      room.characters.forEach(char => {
        if (char.hasEffect('sleeping') || char.hasTag('asleep')) {
          char.removeEffect('sleeping');
          char.say("<red>The piercing alarm bolts you awake!</red>");
        }
      });
    },

    triggerMentalAlert(state, room, entity) {
      const caster = state.PlayerManager.getPlayerById(this.state.casterId);
      if (caster) {
        caster.say(`<bold><cyan>Mental Alarm: An intruder has entered the ward at [${room.title}].</cyan></bold>`);
      }
    },

    effectDeactivated() {
      const caster = state.PlayerManager.getPlayerById(this.state.casterId);
      if (caster) {
        caster.say("<grey>Your alarm ward has expired.</grey>");
      }
    }
  }
};

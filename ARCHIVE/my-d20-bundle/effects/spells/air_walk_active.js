// path: ./bundles/my-d20-bundle/effects/spells/air_walk_active.js
'use strict';

module.exports = {
  config: {
    name: "Air Walk",
    description: "Tread on air as if it were solid ground. +4 stability vs wind.",
    type: "buff",
    family: "adaptation",
    tier: 4
  },

  state: {
    casterId: null
  },

  modifiers: {
    attributes: {
      // +4 bonus to avoid being moved by wind/gales
      fortitude: (target, current) => {
        return target.room.hasTag('windy') ? current + 4 : current;
      }
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      target.addTag('can_walk_air');
      // Elevation Access: Allows using 'up'/'down' exits in aerial rooms
      target.addTag('ignore_gravity_movement'); 
    },

    /**
     * Engine Hook: Combat Tripping
     * In 3.5e, an air walker can be tripped but stays at the same altitude.
     */
    onStatusApplied(status) {
      if (status.name === 'prone') {
        this.target.say("<cyan>You are knocked off balance, but the air supports you. You remain suspended, kneeling on the sky.</cyan>");
      }
    },

    /**
     * Safety Logic: 1d6 rounds of slow descent if the spell ends.
     */
    effectDeactivated() {
      const target = this.target;
      target.removeTag('can_walk_air');
      target.removeTag('ignore_gravity_movement');

      // If they are in the air, trigger the slow descent buffer
      if (target.room.hasTag('aerial')) {
        const rounds = Math.floor(Math.random() * 6) + 1;
        const slowFall = this.state.EffectFactory.create('air_walk_descent', {
          duration: rounds * 6000
        });
        target.addEffect(slowFall);
        target.say("<yellow>The air beneath your feet softens. You begin a gentle, floating descent toward the earth.</yellow>");
      }
    }
  }
};

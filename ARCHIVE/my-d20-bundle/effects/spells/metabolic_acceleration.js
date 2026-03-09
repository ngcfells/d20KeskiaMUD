'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  config: {
    name: "Accelerated Metabolism",
    description: "Your life processes are running at 144x speed.",
    type: "buff",
    family: "time",
    tier: 4,
    duration: 60000
  },

  state: {
    casterUuid: null,
    ticksActive: 0
  },

  listeners: {
    /**
     * HEARTBEAT LOGIC: Processes 1 'Day' of healing/hunger every 60s
     */
    updateTick() {
      const target = this.target;
      const state = this.gameState;
      this.state.ticksActive++;

      // 1. ANCHOR CHECK: Verify caster still has the lit candle
      const caster = state.PlayerManager.getPlayerByUuid(this.state.casterUuid);
      if (!caster || !caster.inventory.findItem('double_ended_candle')) {
        target.say("<red>The chronal anchor snaps! Your metabolism crashes back to normal.</red>");
        return this.remove();
      }

      // 2. RESOURCE CHECK: Consumes 1 unit of food/water from inventory
      const food = target.inventory.findItem('rations');
      const water = target.inventory.findItem('water_skin');

      if (!food || !water) {
        target.say("<bold><red>Your body is starving! Without fuel, the accelerated time begins to eat your own tissues.</red></bold>");
        state.Damage.apply({ amount: 10, type: 'kinetic', target: target, source: "Starvation" });
        return;
      }

      // Consume resources (assuming consume() helper exists)
      food.emit('consume', target);
      water.emit('consume', target);

      // 3. HEALING LOGIC
      let healAmount = 1;
      const conScore = target.getAttribute('constitution') || 10;
      const conMod = Math.floor((conScore - 10) / 2);

      // Con bonus applies every 7th tick (per 2E logic: Subsquent multiples of 7)
      if (this.state.ticksActive % 7 === 0 && conMod > 0) {
        healAmount += conMod;
        B.sayAt(target, "<green>Your superior constitution bolsters the rapid cellular repair.</green>");
      }

      target.setAttribute('health', Math.min(target.getMaxAttribute('health'), target.getAttribute('health') + healAmount));
      
      // 4. AGING LOGIC: 28 turns = 1 week
      if (this.state.ticksActive % 28 === 0) {
        target.say("<yellow>The stress of the spell is visible; your hair graying slightly as you age a week in less than half an hour.</yellow>");
        // If your MUD tracks age, increment here.
      }

      B.sayAt(target, "<cyan>You feel days of recovery passing in a blur of eating and resting.</cyan>");
    },

    /**
     * COMBAT RESTRICTION: Cannot move/fight faster.
     */
    onBeforeAction(action) {
      if (['attack', 'flee', 'cast'].includes(action.name)) {
        B.sayAt(this.target, "<yellow>Your mind is a blur of metabolic focus; you cannot coordinate combat actions any faster than usual.</yellow>");
      }
    }
  }
};

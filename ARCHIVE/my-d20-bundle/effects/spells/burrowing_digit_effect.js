// path: ./bundles/my-d20-bundle/effects/spells/burrowing_digit_effect.js
'use strict';

module.exports = {
  config: {
    name: "Burrowing Digit",
    description: "A skeletal finger is tunneling through your body, causing 1d6 damage per round.",
    type: "condition",
    family: "pain",
    tier: 3
  },

  state: {
    casterId: null
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><bold>The bone shard twitches and begins to crawl deeper into your wound!</bold></red>");
    },

    /**
     * Burrowing Damage: Happens every combat round (6s)
     */
    updateTick() {
      const target = this.target;
      const damage = Math.floor(Math.random() * 6) + 1;
      
      target.receiveDamage('kinetic', damage);
      target.say("<red>The skeletal finger scrapes against your internal organs as it tunnels further!</red>");
      
      // Perspective: Room
      target.room.broadcastExcept(target, `<red>${target.name} gasps in agony as a visible lump moves beneath their skin.</red>`);
    },

    effectDeactivated() {
      this.target.say("<yellow>The burrowing sensation stops as the bone shard finally turns to dust within you.</yellow>");
    }
  }
};

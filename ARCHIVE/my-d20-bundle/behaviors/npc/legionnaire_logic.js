// path: bundles/my-d20-bundle/scripts/behaviors/npcs/legionnaire_logic.js
'use strict';

module.exports = {
  listeners: {
    /**
     * Logic: On every heartbeat, look for targets.
     */
    updateTick: state => function () {
      if (this.isInCombat()) return;

      const masterId = this.getMeta('master');
      
      // Filter for living targets in the room that are NOT the master
      const targets = this.room.characters.filter(char => {
        return char.id !== masterId && 
               !char.hasTag('undead') && 
               !char.hasTag('construct');
      });

      if (targets.length > 0) {
        // Attack the first valid living target found
        const target = targets[0];
        this.say(`<red>With a dry rattle of bone, the legionnaire lunges toward ${target.name}!</red>`);
        this.initiateCombat(target);
      }
    },

    /**
     * Ensure they don't accidentally aggro the master during combat sweeps
     */
    combatStart: state => function (target) {
      if (target.id === this.getMeta('master')) {
        this.removeFromCombat();
        this.say("<grey>The necrotic command holds; it refuses to strike its awakener.</grey>");
      }
    }
  }
};

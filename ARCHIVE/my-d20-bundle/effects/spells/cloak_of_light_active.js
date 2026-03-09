'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  config: {
    name: "Cloak of Light",
    description: "A radiant mantle protects you and illuminates the dark.",
    type: "buff",
    family: "holy",
    tier: 4,
    duration: 6000
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      // Synchronized with your light_spell.js metadata
      target.setMeta('is_light_source', true);
      target.addTag('is_illuminated'); 
      
      target.say("<bold><white>The white light of the cloak flares, banishing the shadows around you.</white></bold>");
    },

    /**
     * Turning Bonus: +2 to turning rolls
     */
    onTurnAttempt(turnData) {
      turnData.bonus += 2;
    },

    /**
     * Energy Drain Protection: Grants a +2 save vs Death Magic (Fortitude)
     */
    onBeingDrained(drainData) {
      drainData.allowSave = true;
      drainData.saveBonus += 2;
      B.sayAt(this.target, "<bold><white>The cloak pulses with solar fury, shielding your soul!</white></bold>");
    },

    /**
     * Combat Synergy: +1 to hit/dmg vs Undead; -1 to Undead attackers
     */
    onAttack(attack) {
      const target = attack.target;
      if (target.hasTag('undead') || target.getMeta('type') === 'undead') {
        attack.damage += 1;
        attack.hitBonus += 1;
      }
    },

    onBeingAttacked(attacker, attack) {
      if (attacker.hasTag('undead') || attacker.getMeta('type') === 'undead') {
        attack.hitBonus -= 1;
        attack.damage -= 1;
        B.sayAt(attacker, "<white>The brilliant light of the cloak sears your eyes!</white>");
      }
    },

    effectDeactivated() {
      const target = this.target;
      target.setMeta('is_light_source', false);
      target.removeTag('is_illuminated');
      target.say("<white>The radiant cloak of light fades away.</white>");
    }
  }
};

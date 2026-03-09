'use strict';

/**
 * Behavior for the Ink-Threaded Jian
 * Redirects incoming melee momentum.
 */
module.exports = {
  listeners: {
    /**
     * Triggered when the wielder is targeted for an attack
     */
    wielderAttackIncoming: state => function (attacker, damage) {
      const wielder = this.owner;
      
      // Taiji Logic: If the wielder has high Dexterity, redirect the force
      const dexMod = Math.floor(((wielder.getAttribute('dexterity') || 10) - 10) / 2);
      const procChance = 10 + (dexMod * 2); // Liang Chou (Dex 22) has a ~22% chance

      if (Math.random() * 100 <= procChance) {
        wielder.say("<blue>Your jian traces a perfect arc, guiding the blow into the void.</blue>");
        attacker.say("<white>The Ink-Threaded Jian catches your blade and spins your momentum aside.</white>");
        
        // Cancel the damage
        damage.amount = 0;
      }
    }
  }
};

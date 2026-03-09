// path: ./bundles/my-d20-bundle/effects/spells/dangerous_digits_effect.js
'use strict';

module.exports = {
  config: {
    name: "Dangerous Digits",
    description: "Can launch fingers as 1d6 piercing missiles (ranged touch).",
    type: "buff",
    family: "necromancy",
    tier: 3
  },

  state: {
    remainingFingers: 10,
    size: 'M'
  },

  listeners: {
    /**
     * Custom command for the skeleton NPC logic or master's command.
     */
    onFireDigit(target) {
      if (this.state.remainingFingers <= 0) return;

      this.state.remainingFingers--;
      const size = this.state.size;

      // Damage Scaling per size category
      let damageDice = '1d6';
      if (size === 'S') damageDice = '1d3';
      else if (['L', 'H'].includes(size)) damageDice = '1d8';
      else if (['G', 'C'].includes(size)) damageDice = '2d6';

      // Perspective: Target
      target.say("<blue>A skeletal finger streaks toward you in a brilliant blue flash!</blue>");
      
      // Perform Ranged Touch Attack (+0 baseline for simple skeletons)
      const hit = (Math.floor(Math.random() * 20) + 1) >= 10; // vs Touch AC 10

      if (hit) {
        const dmg = target.state.Dice.roll(damageDice);
        target.receiveDamage('kinetic', dmg, this.target);
        target.say(`<red>The bone shard impales you for ${dmg} piercing damage!</red>`);
      }

      // Claw Penalty Logic
      const used = 10 - this.state.remainingFingers;
      if (used > 7) {
        this.target.addTag('lost_both_claws');
      } else if (used > 3) {
        this.target.addTag('lost_one_claw');
      }
    },

    effectDeactivated() {
      // Permanent effect; only removed if skeleton is destroyed.
    }
  }
};

'use strict';

const { Logger } = require('ranvier');
const DamageTypes = require('../../lib/combat/damage-types');

module.exports = {
  listeners: {
    /**
     * Handle Resistances, Immunities, and DR
     */
    onBeforeDamage: function (state) {
      return (damage, target) => {
        const config = this.config; // Config from demons.yml

        // 1. IMMUNITIES (Electricity, Poison/Acid)
        if (config.immunities && config.immunities.includes(damage.type)) {
          damage.amount = 0;
          return;
        }

        // 2. RESISTANCES (Fire, Cold, Acid 10)
        if (config.resistances && config.resistances[damage.type]) {
          const res = config.resistances[damage.type];
          damage.amount = Math.max(0, damage.amount - res);
        }

        // 3. DAMAGE REDUCTION (DR 10/Cold Iron or DR 10/Good)
        // DR only applies to Kinetic (Archaic) or Ballistic (Modern) damage.
        if (config.damage_reduction && [DamageTypes.KINETIC, DamageTypes.BALLISTIC].includes(damage.type)) {
          const { amount, type: bypassType } = config.damage_reduction;
          
          // Check if the attacker's weapon bypasses the DR
          const bypasses = damage.metadata && damage.metadata.subtypes && 
                           damage.metadata.subtypes.includes(bypassType);

          if (!bypasses) {
            damage.amount = Math.max(0, damage.amount - amount);
          }
        }
      };
    },

    /**
     * Vrock Screech / Stinking Cloud logic could be triggered here or in a separate script
     */
    onTick: function (state) {
      // Optional: Add logic for 'protective_slime' or 'aura' ticks here.
    }
  }
};

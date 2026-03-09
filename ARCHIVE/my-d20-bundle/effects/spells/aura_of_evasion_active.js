'use strict';

/**
 * Aura of Evasion Effect
 * ----------------------
 * Manages the global hooks for Reflex bonuses and Evasion damage mitigation
 * based on proximity to the caster.
 */
module.exports = {
  config: {
    name: "Aura of Evasion",
    description: "An emerald aura grants you enhanced reflexes and evasion against area attacks.",
    type: "condition",
    family: "abjuration",
    tier: 1,
    maxTier: 1
  },
  listeners: {
    effectActivated() {
      const caster = this.target;
      
      // Hook: Bonus to Reflex Saves
      this.saveHook = (saveData, checkContext) => {
        const victim = saveData.target;
        const distance = state.utils.getDistance(victim.position, caster.position);
        
        if (distance <= 10 && saveData.type === 'reflex' && checkContext.isAreaEffect) {
          if (victim.isAllyOf(caster) || victim === caster) {
            saveData.addBonus(4, 'sacred');
          }
        }
      };

      // Hook: Evasion Logic
      this.damageHook = (damageData) => {
        const victim = damageData.target;
        const distance = state.utils.getDistance(victim.position, caster.position);

        if (distance <= 10 && damageData.saveResult === 'success' && (victim.isAllyOf(caster) || victim === caster)) {
          // Negate damage on success (Evasion)
          damageData.multiplier = 0;
          victim.say("<green>The emerald aura flares, negating the blast!</green>");
        }
      };

      state.addHook('onCalculateSave', this.saveHook);
      state.addHook('onApplyAreaDamage', this.damageHook);
    },

    effectDeactivated() {
      state.removeHook('onCalculateSave', this.saveHook);
      state.removeHook('onApplyAreaDamage', this.damageHook);
      this.target.say("<yellow>The emerald shimmer around you fades.</yellow>");
    }
  }
};

'use strict';

/**
 * Aura of Vitality Effect
 * -----------------------
 * Allies within the 30ft radius gain +4 Morale to Str, Dex, and Con.
 * This effect follows the caster's position.
 */
module.exports = {
  config: {
    name: "Aura of Vitality",
    description: "Invigorated by a golden aura, granting +4 morale bonus to physical attributes.",
    type: "condition",
    family: "transmutation",
    tier: 1,
    maxTier: 1
  },
  listeners: {
    effectActivated() {
      const caster = this.target;
      
      // Update allies periodically or on move
      this.applyVitality = () => {
        const allies = caster.room.players.filter(p => p === caster || p.isAllyOf(caster));
        
        allies.forEach(ally => {
          const distance = state.utils.getDistance(ally.position, caster.position);
          
          if (distance <= 30) {
            if (!ally.effects.has('vitality_boost')) {
              const boost = state.EffectFactory.create('vitality_boost', ally, {
                duration: 6000, // Refreshes while in aura
                metadata: { sourceId: this.id }
              });
              ally.addEffect(boost);
            }
          }
        });
      };

      state.addHook('onTick', this.applyVitality);
      state.addHook('onUnitMove', this.applyVitality);
    },

    effectDeactivated() {
      state.removeHook('onTick', this.applyVitality);
      state.removeHook('onUnitMove', this.applyVitality);
      this.target.say("<grey>The golden radiance of vitality fades away.</grey>");
    }
  }
};

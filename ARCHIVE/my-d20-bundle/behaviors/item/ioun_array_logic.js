'use strict';

const IounResonance = require('../../lib/d20/ioun-resonance');

module.exports = {
  listeners: {
    /**
     * Syncs the Ioun Array with the wielder's attributes.
     */
    updateTick: state => function () {
      const owner = this.owner;
      if (!owner) return;

      // 1. Calculate Active Harmonies
      const harmonies = IounResonance.calculateResonance(owner);
      
      // 2. Apply/Refresh Resonance Effects
      harmonies.forEach(harmony => {
        const effectId = `resonance_${harmony.id}`;
        if (!owner.effects.has(effectId)) {
          const effect = state.EffectFactory.create('ioun_resonance_bonus', {
            id: effectId,
            config: { name: harmony.name },
            state: { bonus: harmony.bonus }
          });
          owner.addEffect(effect);
        }
      });

      // 3. Static/Overload Management
      const intScore = owner.getAttribute('intelligence') || 10;
      const stones = owner.getMeta('orbiting_stones') || [];
      const threshold = 10 + (Math.floor((intScore - 10) / 2) * 2);

      if (stones.length > threshold && !owner.effects.has('ioun_vision_blur')) {
        owner.addEffect(state.EffectFactory.create('ioun_vision_blur'));
      }
    }
  }
};

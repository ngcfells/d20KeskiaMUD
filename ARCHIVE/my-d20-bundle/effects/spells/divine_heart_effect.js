'use strict';

/**
 * Divine Heart Effect
 * ------------------
 * Grants absolute immunity to the 'fear' family of effects.
 * Clears any existing fear effects upon application.
 */
module.exports = {
  config: {
    name: "Divine Heart",
    description: "Immune to all fear effects.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {},
  listeners: {
    effectActivated() {
      const target = this.target;
      
      // 3.5e Logic: If you become immune to fear, existing fear is suppressed or removed.
      const fearEffects = ['rattled', 'shaken', 'frightened', 'panicked', 'cowering'];
      
      target.effects.forEach(effect => {
        if (fearEffects.includes(effect.config.name.toLowerCase()) || effect.config.family === 'fear') {
          target.say("<yellow>The divine pulse in your chest drives out the lingering shadows of terror.</yellow>");
          effect.remove();
        }
      });
    },

    /**
     * Intercept new fear effects
     */
    onEffectAdd: state => function (effect, result) {
      if (effect.config.family === 'fear' || effect.config.type === 'fear') {
        const spellDef = state.SpellManager.get('divine_heart');
        if (spellDef && spellDef.emotes.fearBlocked) {
          spellDef.emotes.fearBlocked(this.target);
        }
        
        // Prevent the effect from being added
        result.cancel = true;
      }
    },

    /**
     * Intercept Intimidate or specific fear-based skill checks
     */
    onCreatureIntimidated: state => function (data) {
        this.target.say("<white>The attempt to cow you fails utterly; your heart beats with divine courage.</white>");
        data.cancel = true;
    }
  }
};

'use strict';

/**
 * Greater Contagion Touch
 * -----------------------
 * Empowers the caster's touch. Every creature touched while this 
 * effect is active must save or be infected.
 */
module.exports = {
  config: {
    name: "Plague Touch",
    description: "Your touch carries a virulent disease.",
    type: "spell_effect",
    unique: true
  },
  state: {
    dc: 20,
    diseaseType: 'slimy_doom'
  },
  listeners: {
    /**
     * Triggered whenever the caster performs a touch attack 
     * or successful melee hit.
     */
    onMeleeHit: state => function (target, damage) {
        this.emit('applyContagion', target);
    },

    applyContagion: state => function (target) {
        const caster = this.target;
        const spellDef = state.SpellManager.get('greater_contagion');

        // Check saving throw
        const roll = Math.floor(Math.random() * 20) + 1;
        const fortSave = (target.getAttribute('fortitude') || 0) + roll;

        if (fortSave < this.state.dc) {
            const disease = state.EffectFactory.create(this.state.diseaseType, {
                config: { duration: -1 } // Diseases are permanent until cured
            });
            
            target.addEffect(disease);
            if (spellDef.emotes.infectionImpact) {
                spellDef.emotes.infectionImpact(target, disease.config.name);
            }
            if (spellDef.emotes.observer) {
                spellDef.emotes.observer(caster, target);
            }
        }
    }
  }
};

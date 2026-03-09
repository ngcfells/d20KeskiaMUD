'use strict';

/**
 * Logic: Pulls evocative emotes directly from the parent spell definition 
 * to ensure consistency and single-point-of-truth for narrative text.
 */
module.exports = {
  config: {
    name: "Antipathy Aura",
    description: "An overwhelming urge to leave this area/object.",
    type: "spell_effect",
    unique: true
  },
  state: {
    repelledType: 'humanoid',
    dc: 20
  },
  listeners: {
    onCreatureEntry: state => function (creature) {
      const spellDef = state.SpellManager.get('antipathy');
      const targetType = creature.getMeta('creatureType');
      
      if (targetType !== this.state.repelledType) {
         if (spellDef.emotes.observer) spellDef.emotes.observer(this.target, creature);
         return;
      }

      // Approach messaging
      if (spellDef.emotes.approachAffected) spellDef.emotes.approachAffected(creature, this.target);
      
      const roll = Math.floor(Math.random() * 20) + 1;
      const willSave = (creature.getAttribute('will') || 0) + roll;

      if (willSave < this.state.dc) {
        if (spellDef.emotes.failSave) spellDef.emotes.failSave(creature);
        
        // Tiered Fear: Shaken
        const shaken = state.EffectFactory.create('shaken', { config: { duration: 60000 } });
        creature.addEffect(shaken);

        // Force move
        creature.emit('forceMove'); 
      } else {
        if (spellDef.emotes.passSave) spellDef.emotes.passSave(creature);
      }
    }
  }
};

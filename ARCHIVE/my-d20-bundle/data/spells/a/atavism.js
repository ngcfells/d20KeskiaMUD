'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * You awaken the primal beast within. Gains +4 STR, +4 CON, +2 Natural Armor, 
 * and a Bite attack, but loses the ability to cast spells or use complex skills.
 */
module.exports = {
  id: 'atavism',
  name: 'Atavism',
  level: 4,
  school: 'transmutation',
  subschool: null,
  descriptors: ['mind-affecting'],
  source: 'Standard',

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { id: 'raw_meat', quantity: 1, consumed: true }
  ],

  range: 'personal',
  target: 'self',
  area: null,
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    caster.room.broadcast(`${caster.name}'s brow thickens and their teeth sharpen into predatory points!`);
    
    const effect = state.EffectFactory.create('atavistic_rage', caster, {
      duration: (1 * 6000) * caster.level // 1 round per level
    });

    caster.addEffect(effect);
  }
};

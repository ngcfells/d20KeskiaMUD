/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Reverse Lifeline
 * Source: WotC | Chronomancer (2E) p.25
 */
module.exports = {
  id: 'reverse_lifeline',
  name: 'Reverse Lifeline',
  level: 8,
  school: 'transmutation',
  subschool: 'chronomancy',
  descriptors: ['aging', 'time'],
  source: 'Chronomancer (2E) p.25',

  castingTime: '1 round',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { id: 'polished_amber', quantity: 1, consumed: true },
    { id: 'tether_beast_ichor', quantity: 1, consumed: true },
    { 
      id: 'chronal_spring_water', 
      quantity: 1, 
      consumed: true,
      notes: 'Spring water subjected to the Demiplane of Time for one subjective day.'
    }
  ],

  range: 'touch',
  target: 'one living creature',
  duration: 'instantaneous',
  savingThrow: 'fortitude negates',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    B.sayAt(caster, `<bold><cyan>You pour the chronal water over your hands and touch ${target.name}, drawing their past back into their present.</cyan></bold>`);
    
    // System Shock Check
    const targetHD = target.getMeta('hitDice') || 1;
    const savePassed = state.SpellcastingManager._savingThrow(state, target, 'fortitude', 15 + targetHD);

    if (!savePassed) {
       // Failure kills the creature from cellular shock
       const deathTimer = state.EffectFactory.create('chronal_collapse', { duration: 12000 });
       target.addEffect(deathTimer);
       return;
    }

    const deagingEffect = state.EffectFactory.create('aging_transition', {
      duration: 120000, 
      state: { years: cl * -1, isReversal: true }
    });
    target.addEffect(deagingEffect);

    target.say("<cyan>The lines on your face vanish and your vigor returns as your cells rejuvenate.</cyan>");
  }
};

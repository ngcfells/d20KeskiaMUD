/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Places a creature or object into a state of suspended animation. 
 * For the target, time ceases to flow.
 */
module.exports = {
  id: 'temporal_stasis',
  name: "Temporal Stasis",
  level: 8,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'PHB | p. 293',

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { id: 'amber_powder', quantity: 1, minValue: 500, consumed: true },
    { id: 'diamond_dust', quantity: 1, minValue: 500, consumed: true }
  ],

  range: 'touch',
  target: 'creature or object touched',
  duration: 'permanent',
  savingThrow: 'fortitude-negates',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (ctx.savePassed) {
      return caster.say("<white>The target's timeline remains fluid.</white>");
    }

    caster.say(`<magenta>You touch ${target.name}, and the world stops for them.</magenta>`);
    
    const stasis = state.EffectFactory.create('amber_cocoon', {
      config: { duration: -1 } // Permanent until dispelled
    });
    target.addEffect(stasis);
  }
};

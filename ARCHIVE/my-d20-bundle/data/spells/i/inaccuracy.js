/**
 * Canonical Spell Definition Contract: Inaccuracy
 */
module.exports = {
  id: 'inaccuracy',
  name: 'Inaccuracy',
  level: 1,
  school: 'enchantment',
  subschool: 'geometry',
  descriptors: ['oriental'],
  source: "Oriental Adventures",

  castingTime: '1 round',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { id: 'ground_glass', quantity: 1, consumed: true, notes: 'A thick piece of ground glass.' }
  ],

  range: 'close',
  target: 'one creature',
  duration: '1 round/level',
  savingThrow: 'will negates',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    B.sayAt(caster, `<magenta>You peer through a shard of ground glass and whisper a confusing mantra at ${target.name}.</magenta>`);
    
    if (ctx.savePassed) {
      return B.sayAt(caster, `<yellow>${target.name} maintains their spatial awareness.</yellow>`);
    }

    const inaccuracyEffect = state.EffectFactory.create('inaccuracy_debuff', {
      duration: cl * 6000
    });
    target.addEffect(inaccuracyEffect);
    
    B.sayAt(target, "<red>The world seems to warp and stretch. Distances become difficult to judge.</red>");
  }
};

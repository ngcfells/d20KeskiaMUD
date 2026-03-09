module.exports = {
  id: 'dispel_alignment', //select chaos, good, evil, or law
  name: 'Dispel Alignment',
  level: 5,
  school: 'abjuration',
  descriptors: ['lawful'],
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [],
  range: 'touch',
  target: 'self',
  duration: '1 round/level',
  savingThrow: 'see text',
  spellResistance: true,
  onCast(state, caster) {
    caster.addEffect(state.EffectManager.create('anti_chaos_shield', { caster }));
    caster.say("You surround yourself with a flickering blue field of pure, crystalline logic.");
  }
};

module.exports = {
  id: 'blur',
  name: 'Blur',
  level: 2,
  school: 'illusion',
  subschool: 'mirage',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],
  range: 'touch',
  target: 'creature',
  duration: '1 min/level',
  savingThrow: 'will_negates (harmless)',
  spellResistance: true (harmless),
  onCast(state, caster, target) {
    // Logic: 20% miss chance due to concealment.
    target.addEffect(state.EffectManager.create('blurred_outline', { caster }));
    target.room.broadcast(`${target.name}'s form becomes watery and indistinct.`);
  }
};

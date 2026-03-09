module.exports = {
  id: 'dominate_monster',
  name: 'Dominate Monster',
  level: 9,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],
  range: 'medium',
  target: 'one creature',
  duration: '1 day/level',
  savingThrow: 'will_negates',
  spellResistance: true,
  onCast(state, caster, target) {
    target.addEffect(state.EffectManager.create('dominated_state', { caster }));
    caster.say(`You establish a telepathic leash upon the mind of ${target.name}.`);
  }
};

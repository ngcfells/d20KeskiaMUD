module.exports = {
  id: 'dominate_person',
  name: 'Dominate Person',
  level: 5,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],
  range: 'medium',
  target: 'one humanoid',
  duration: '1 day/level',
  savingThrow: 'will_negates',
  spellResistance: true,
  onCast(state, caster, target) {
    target.addEffect(state.EffectManager.create('dominated_state', { caster }));
    target.say(`${caster.name}'s voice echoes in the center of your mind, brooking no refusal.`);
  }
};

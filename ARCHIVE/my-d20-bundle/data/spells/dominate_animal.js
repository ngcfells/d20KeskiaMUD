module.exports = {
  id: 'dominate_animal',
  name: 'Dominate Animal',
  level: 3,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],
  range: 'close',
  target: 'one animal',
  duration: '1 round/level',
  savingThrow: 'will_negates',
  spellResistance: true,
  onCast(state, caster, target) {
    if (target.getProperty('creatureType') !== 'animal') return caster.say("This only affects beasts.");
    target.addEffect(state.EffectManager.create('dominated_state', { caster }));
    target.room.broadcast(`${target.name} stops in its tracks, its eyes clouding as it awaits ${caster.name}'s command.`);
  }
};

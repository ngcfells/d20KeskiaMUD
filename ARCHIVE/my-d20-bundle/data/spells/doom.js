module.exports = {
  id: 'doom',
  name: 'Doom',
  level: 1,
  school: 'necromancy',
  descriptors: ['fear', 'mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S, DF'],
  materialComponents: [],
  range: 'medium',
  target: 'one living creature',
  duration: '1 min/level',
  savingThrow: 'will_negates',
  spellResistance: true,
  onCast(state, caster, target) {
    // Logic: Target becomes Shaken (-2 on attacks, saves, checks).
    target.addEffect(state.EffectManager.create('shaken_condition', { caster }));
    target.room.broadcast(`${target.name} is overwhelmed by a sudden, crushing sense of impending doom.`);
  }
};

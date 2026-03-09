module.exports = {
  id: 'deathwatch',
  name: 'Deathwatch',
  level: 1,
  school: 'necromancy',
  descriptors: ['evil'],
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],
  range: '30 ft',
  target: 'cone-shaped emanation',
  duration: '10 min/level',
  savingThrow: 'none',
  spellResistance: false,
  onCast(state, caster) {
    caster.addEffect(state.EffectManager.create('death_vision', { caster }));
    caster.say("You see the fragility of life, the exact state of health of everyone nearby.");
  }
};

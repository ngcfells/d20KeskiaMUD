module.exports = {
  id: 'divine_power',
  name: 'Divine Power',
  level: 4,
  school: 'evocation',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [],
  range: 'personal',
  target: 'self',
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,
  onCast(state, caster) {
    // Logic: BAB becomes equal to Character Level, +6 enhancement to STR, 1 temp HP/level
    caster.addEffect(state.EffectManager.create('avatars_might', { caster }));
    caster.room.broadcast(`${caster.name} swells with divine energy, becoming a literal vessel of their deity's wrath.`);
  }
};

module.exports = {
  id: 'blacklight',
  name: 'Blacklight',
  level: 3,
  school: 'evocation',
  descriptors: ['darkness'],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [{ id: 'piece_of_coal', quantity: 1, consumed: true }],
  range: 'close',
  target: 'area',
  area: '20-ft.-radius emanation',
  duration: '1 round/level',
  savingThrow: 'will_negates',
  spellResistance: true,
  onCast(state, caster) {
    // Logic: Total darkness that the caster can see through.
    caster.room.addEffect(state.EffectManager.create('blacklight_zone', { caster }));
    caster.room.broadcast("A sphere of absolute, ink-black darkness erupts, swallowing all light.");
  }
};

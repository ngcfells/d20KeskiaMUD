module.exports = {
  id: 'desecrate',
  name: 'Desecrate',
  level: 2,
  school: 'evocation',
  descriptors: ['evil'],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { id: 'vial_unholy_water', quantity: 1, consumed: true },
    { id: 'silver_dust', quantity: 1, minValue: 25, consumed: true }
  ],
  range: 'close',
  target: 'area',
  area: '20-ft. radius emanation',
  duration: '2 hours/level',
  savingThrow: 'none',
  spellResistance: true,
  onCast(state, caster) {
    caster.room.addEffect(state.EffectManager.create('desecrated_ground', { caster }));
    caster.room.broadcast("A palpable sense of profanity settles over the area, bolstering the undead.");
  }
};

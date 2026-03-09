module.exports = {
  id: 'dust_of_twilight',
  name: 'Dust of Twilight',
  level: 2,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [{ id: 'pinch_of_coal', quantity: 1, consumed: true }],
  range: 'medium',
  target: 'area',
  area: '10-ft. radius spread',
  duration: 'instantaneous',
  savingThrow: 'fort_negates',
  spellResistance: false,
  onCast(state, caster) {
    // Logic: Dispels light effects and potentially fatigues creatures.
    caster.room.addEffect(state.EffectManager.create('twilight_dimming', { caster }));
    caster.room.broadcast("Fine, glowing particles settle over the area, extinguishing light and inducing lethargy.");
  }
};

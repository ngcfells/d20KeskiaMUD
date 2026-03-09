module.exports = {
  id: 'displacement',
  name: 'Displacement',
  level: 3,
  school: 'illusion',
  subschool: 'glamer',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'M'],
  materialComponents: [{ id: 'displaced_beast_hide', quantity: 1, consumed: true }],
  range: 'touch',
  target: 'creature touched',
  duration: '1 round/level',
  savingThrow: 'will_negates (harmless)',
  spellResistance: true (harmless),
  onCast(state, caster, target) {
    // Logic: 50% miss chance; target appears about 2 feet away from actual location.
    target.addEffect(state.EffectManager.create('displaced_image', { caster }));
    target.room.broadcast(`${target.name}'s image shifts and shudders, appearing slightly out of place.`);
  }
};

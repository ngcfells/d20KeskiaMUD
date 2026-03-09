module.exports = {
  id: 'detect_scrying',
  name: 'Detect Scrying',
  level: 4,
  school: 'divination',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [{ id: 'mirrored_glass', quantity: 1, consumed: true }],
  range: '40 ft',
  target: '40-ft. radius emanation centered on self',
  duration: '24 hours',
  savingThrow: 'none',
  spellResistance: false,
  onCast(state, caster) {
    caster.addEffect(state.EffectManager.create('anti_scrying_ping', { caster }));
    caster.say("You establish a mental perimeter; any magical observation will now trigger a warning.");
  }
};

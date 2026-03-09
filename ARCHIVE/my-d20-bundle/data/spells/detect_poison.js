module.exports = {
  id: 'detect_poison',
  name: 'Detect Poison',
  level: 0,
  school: 'divination',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],
  range: 'close',
  target: 'one creature, object, or 5-ft. cube',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,
  onCast(state, caster, target) {
    const isPoisonous = target.getProperty('poisonous') || target.hasEffectType('poison');
    caster.say(isPoisonous ? `You detect the presence of toxic substances in ${target.name}.` : "You detect no poison.");
  }
};

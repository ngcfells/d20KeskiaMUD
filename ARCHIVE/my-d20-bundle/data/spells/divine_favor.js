module.exports = {
  id: 'divine_favor',
  name: 'Divine Favor',
  level: 1,
  school: 'evocation',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [],
  range: 'personal',
  target: 'self',
  duration: '1 minute',
  savingThrow: 'none',
  spellResistance: false,
  onCast(state, caster) {
    // Logic: +1 luck bonus to attack/damage for every 3 levels (max +3)
    const bonus = Math.min(Math.floor(caster.level / 3) + 1, 3);
    caster.addEffect(state.EffectManager.create('luck_of_the_gods', { bonus }));
    caster.say("You feel the gaze of your deity upon you, guiding your hand in battle.");
  }
};

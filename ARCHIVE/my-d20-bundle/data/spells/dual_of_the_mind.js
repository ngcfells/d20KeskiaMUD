module.exports = {
  id: 'dual_of_the_mind',
  name: 'Dual of the Mind',
  level: 2,
  school: 'abjuration',
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],
  range: 'personal',
  target: 'self',
  duration: '10 min/level',
  savingThrow: 'none',
  spellResistance: false,
  onCast(state, caster) {
    // Logic: +4 bonus on saves against mind-affecting effects.
    caster.addEffect(state.EffectManager.create('mental_fortress', { caster }));
    caster.say("You compartmentalize your psyche, hardening your mind against intrusion.");
  }
};

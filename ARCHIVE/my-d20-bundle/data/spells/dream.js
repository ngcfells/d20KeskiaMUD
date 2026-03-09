module.exports = {
  id: 'dream',
  name: 'Dream',
  level: 5,
  school: 'illusion',
  subschool: 'phantasm',
  descriptors: ['mind-affecting'],
  castingTime: '1 minute',
  components: ['V', 'S'],
  materialComponents: [],
  range: 'unlimited',
  target: 'one living creature touched',
  duration: 'see text',
  savingThrow: 'none',
  spellResistance: true,
  onCast(state, caster, target, ctx) {
    const message = ctx.args || "I have sent you a message in your sleep.";
    target.addEffect(state.EffectManager.create('dream_messenger', { sender: caster, msg: message }));
    caster.say(`You enter a trance to send a vision to ${target.name}.`);
  }
};

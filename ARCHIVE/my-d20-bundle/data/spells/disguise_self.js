module.exports = {
  id: 'disguise_self',
  name: 'Disguise Self',
  level: 1,
  school: 'illusion',
  subschool: 'glamer',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],
  range: 'personal',
  target: 'self',
  duration: '10 min/level',
  savingThrow: 'none or will_disbelief',
  spellResistance: false,
  onCast(state, caster, target, ctx) {
    const newDescription = ctx.args || "a common traveler";
    caster.addEffect(state.EffectManager.create('magical_disguise', { desc: newDescription }));
    caster.say(`You wrap yourself in an illusion, appearing as ${newDescription}.`);
  }
};

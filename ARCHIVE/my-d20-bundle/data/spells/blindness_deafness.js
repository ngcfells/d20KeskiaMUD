module.exports = {
  id: 'blindness_deafness',
  name: 'Blindness/Deafness',
  level: 2,
  school: 'necromancy',
  descriptors: [],
  castingTime: 'standard',
  components: ['V'],
  materialComponents: [],
  range: 'medium',
  target: 'one creature',
  duration: 'permanent',
  savingThrow: 'fort_negates',
  spellResistance: true,
  onCast(state, caster, target, ctx) {
    // Logic: Permanently blinds or deafens the target.
    const choice = (ctx.args && ctx.args.includes('deaf')) ? 'deafened' : 'blinded';
    target.addEffect(state.EffectManager.create(choice, { caster }));
    target.room.broadcast(`${target.name} cries out as their ${choice === 'blinded' ? 'eyes cloud over' : 'hearing fades into silence'}!`);
  }
};

module.exports = {
  id: 'curse_putrid_husk',
  name: 'Curse of the Putrid Husk',
  level: 3,
  school: 'illusion',
  subschool: 'phantasm',
  descriptors: ['evil', 'fear', 'mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [{ id: 'patch_of_human_skin', quantity: 1, consumed: true }],
  range: 'close',
  target: 'one creature',
  duration: '1 round + 1d10 rounds',
  savingThrow: 'will_negates',
  spellResistance: true,
  onCast(state, caster, target) {
    // Logic: Target believes their skin is rotting off. 
    // Dazed for 1 round, then unconscious for 1d10 rounds.
    target.addEffect(state.EffectManager.create('rotting_illusion_terror', { caster }));
    target.room.broadcast(`${target.name} screams in sheer horror, clawing at their own flesh!`);
  }
};

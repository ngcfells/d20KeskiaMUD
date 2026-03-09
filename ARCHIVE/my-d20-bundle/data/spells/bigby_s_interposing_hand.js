module.exports = {
  id: 'bigby_s_interposing_hand',
  name: "Bigby's Interposing Hand",
  level: 5,
  school: 'evocation',
  descriptors: ['force'],
  castingTime: 'standard',
  components: ['V', 'S', 'F'],
  materialComponents: [{ id: 'leather_glove', quantity: 1, consumed: false }],
  range: 'medium',
  target: 'one creature',
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: true,
  onCast(state, caster, target) {
    // Logic: Provides cover (+4 AC) to caster against the target.
    // Hand follows the target to maintain the barrier.
    target.addEffect(state.EffectManager.create('interposing_hand_penalty', { caster }));
    caster.room.broadcast(`A Large hand of shimmering force appears between ${caster.name} and ${target.name}.`);
  }
};

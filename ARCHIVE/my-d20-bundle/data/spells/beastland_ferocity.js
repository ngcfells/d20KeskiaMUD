module.exports = {
  id: 'beastland_ferocity',
  name: 'Beastland Ferocity',
  level: 2,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],
  range: 'touch',
  target: 'creature',
  duration: '1 min/level',
  savingThrow: 'will_negates (harmless)',
  spellResistance: true (harmless),
  onCast(state, caster, target) {
    // Logic: Subject can continue to fight without penalty while disabled or dying.
    target.addEffect(state.EffectManager.create('ferocity_aura', { caster }));
    target.room.broadcast(`${target.name} lets out a primal roar, looking ready to fight past death itself!`);
  }
};

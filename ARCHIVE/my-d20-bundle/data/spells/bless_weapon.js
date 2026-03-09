module.exports = {
  id: 'bless_weapon',
  name: 'Bless Weapon',
  level: 1,
  school: 'transmutation',
  descriptors: ['good'],
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],
  range: 'touch',
  target: 'one weapon',
  duration: '1 min/level',
  savingThrow: 'will_negates (harmless, object)',
  spellResistance: true (harmless, object),
  onCast(state, caster, target) {
    // Logic: Weapon becomes good-aligned and automatically confirms critical hits vs evil foes.
    target.addEffect(state.EffectManager.create('blessed_edge', { caster }));
    caster.say(`A soft, white radiance suffuses the edge of ${target.name}.`);
  }
};

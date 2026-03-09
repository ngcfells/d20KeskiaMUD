module.exports = {
  id: 'curse_water',
  name: 'Curse Water',
  level: 1,
  school: 'transmutation',
  descriptors: ['evil'],
  castingTime: '1 minute',
  components: ['V', 'S', 'M'],
  materialComponents: [{ id: 'silver_dust', quantity: 1, minValue: 25, consumed: true }],
  range: 'touch',
  target: 'flask of water',
  duration: 'instantaneous',
  savingThrow: 'will_negates (object)',
  spellResistance: true (object),
  onCast(state, caster, target) {
    // Logic: Creates Unholy Water.
    if (target.id !== 'water_flask') return caster.say("This only works on fresh water.");
    const unholyWater = state.ItemManager.create('unholy_water');
    target.replaceWith(unholyWater);
    caster.say("The water turns a murky, oily black as you infuse it with malice.");
  }
};

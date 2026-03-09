module.exports = {
  id: 'bolas_of_fire',
  name: 'Bolas of Fire',
  level: 2,
  school: 'evocation',
  descriptors: ['fire'],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [{ id: 'sulfur_cord', quantity: 1, consumed: true }],
  range: 'medium',
  target: 'creature',
  duration: 'instantaneous',
  savingThrow: 'ref_partial',
  spellResistance: true,
  onCast(state, caster, target) {
    // Logic: Deals 2d6 fire damage and entangles the target if they fail Ref save.
    const damage = state.Dice.roll('2d6');
    target.damage(damage, caster, { type: 'fire' });
    target.addEffect(state.EffectManager.create('fire_entangled', { caster }));
    target.room.broadcast(`A cord of spinning white-hot flame wraps around ${target.name}'s legs!`);
  }
};

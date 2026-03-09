module.exports = {
  id: 'cone_of_cold',
  name: 'Cone of Cold',
  level: 5,
  school: 'evocation',
  descriptors: ['cold'],
  castingTime: 'standard',
  components: ['V', 'S', 'M/DF'],
  materialComponents: [{ id: 'glass_cone', quantity: 1, consumed: false }],
  range: '60 ft',
  target: 'cone-shaped emanation',
  duration: 'instantaneous',
  savingThrow: 'ref_half',
  spellResistance: true,
  onCast(state, caster) {
    // Logic: 1d6 cold damage per level (max 15d6).
    const damage = state.Dice.roll(`${Math.min(caster.level, 15)}d6`);
    const targets = caster.room.getEnemiesInCone(caster, 60);
    targets.forEach(t => t.damage(damage, caster, { type: 'cold' }));
    caster.room.broadcast("An area of extreme cold drains the heat from the air, frost coating everything in a massive cone.");
  }
};

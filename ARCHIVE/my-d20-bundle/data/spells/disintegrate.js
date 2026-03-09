module.exports = {
  id: 'disintegrate',
  name: 'Disintegrate',
  level: 6,
  school: 'transmutation',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S', 'M/DF'],
  materialComponents: [{ id: 'lodestone', quantity: 1, consumed: true }, { id: 'pinch_of_dust', quantity: 1, consumed: true }],
  range: 'medium',
  target: 'ray',
  duration: 'instantaneous',
  savingThrow: 'fort_partial',
  spellResistance: true,
  onCast(state, caster, target) {
    // Logic: 2d6 damage per level (max 40d6) on fail; 5d6 on success.
    const save = state.Dice.rollSave(target, 'fort', caster.getSpellSaveDC());
    const damage = save.fail ? state.Dice.roll(`${Math.min(caster.level, 20) * 2}d6`) : state.Dice.roll('5d6');
    target.damage(damage, caster, { type: 'force' });
    
    if (save.fail && target.attributes.health.current <= 0) {
      target.room.broadcast(`${target.name} is struck by a thin green ray and vanishes into a cloud of fine dust.`);
      target.die();
    }
  }
};

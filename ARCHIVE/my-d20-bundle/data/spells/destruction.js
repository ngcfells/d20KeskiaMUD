module.exports = {
  id: 'destruction',
  name: 'Destruction',
  level: 7,
  school: 'necromancy',
  descriptors: ['death'],
  castingTime: 'standard',
  components: ['V', 'S', 'F'],
  materialComponents: [{ id: 'holy_symbol_silver', quantity: 1, minValue: 500, consumed: false }],
  range: 'close',
  target: 'one creature',
  duration: 'instantaneous',
  savingThrow: 'fort_partial',
  spellResistance: true,
  onCast(state, caster, target) {
    // Logic: 10d6 damage on successful save; instant death and body consumed on fail.
    const result = state.Dice.rollSave(target, 'fort', caster.getSpellSaveDC());
    if (result.fail) {
      target.die();
      target.room.broadcast(`${target.name} is consumed by absolute void, leaving only fine ash.`);
    } else {
      target.damage(state.Dice.roll('10d6'), caster, { type: 'divine' });
    }
  }
};

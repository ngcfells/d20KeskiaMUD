module.exports = {
  id: 'drown',
  name: 'Drown',
  level: 6,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: ['water'],
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],
  range: 'close',
  target: 'one living creature',
  duration: 'instantaneous',
  savingThrow: 'fort_negates',
  spellResistance: true,
  onCast(state, caster, target) {
    // Logic: Fills lungs with water. Drops target to 0 HP if fail.
    const result = state.Dice.rollSave(target, 'fort', caster.getSpellSaveDC());
    if (result.fail) {
      target.attributes.health.current = 0;
      target.room.broadcast(`${target.name} collapses, water pouring from their mouth as they gasp for air.`);
    }
  }
};

module.exports = {
  id: 'dust_of_death',
  name: 'Dust of Death',
  level: 4,
  school: 'necromancy',
  descriptors: ['death', 'evil'],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [{ id: 'mummified_finger', quantity: 1, consumed: true }],
  range: 'touch',
  target: 'area',
  area: '10-ft. radius spread',
  duration: 'instantaneous',
  savingThrow: 'fort_negates',
  spellResistance: true,
  onCast(state, caster) {
    // Logic: Targets in area must save or take 1d6 CON damage.
    const targets = caster.room.getEnemies(caster);
    targets.forEach(t => {
      const damage = state.Dice.roll('1d6');
      t.damage(damage, caster, { type: 'con_damage' });
    });
    caster.room.broadcast("A cloud of grey, choking dust erupts, smelling of ancient tombs.");
  }
};

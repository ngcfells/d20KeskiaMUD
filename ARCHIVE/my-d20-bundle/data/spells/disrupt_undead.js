module.exports = {
  id: 'disrupt_undead',
  name: 'Disrupt Undead',
  level: 0,
  school: 'necromancy',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],
  range: 'close',
  target: 'one undead creature',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: true,
  onCast(state, caster, target) {
    if (target.getProperty('creatureType') !== 'undead') return caster.say("This only affects the unliving.");
    const damage = state.Dice.roll('1d6');
    target.damage(damage, caster, { type: 'positive_energy' });
    caster.room.broadcast(`A ray of positive energy strikes ${target.name}, causing its form to smoke.`);
  }
};

module.exports = {
  id: 'bonefiddle',
  name: 'Bonefiddle',
  level: 2,
  school: 'necromancy',
  descriptors: ['sonic'],
  castingTime: 'standard',
  components: ['V', 'S', 'F'],
  materialComponents: [{ id: 'silver_fiddle_bow', quantity: 1, minValue: 30, consumed: false }],
  range: 'close',
  target: 'one creature with a skeleton',
  duration: 'concentration, up to 1 round/level',
  savingThrow: 'fort_negates',
  spellResistance: true,
  onCast(state, caster, target) {
    // Logic: Spectral bow "plays" the target's bones, dealing 3d6 sonic damage per round.
    if (!target.getProperty('hasSkeleton')) return caster.say("They have no bones to play.");
    target.addEffect(state.EffectManager.create('bonefiddle_agony', { caster }));
    target.room.broadcast(`A spectral bow appears over ${target.name} and begins a macabre sawing across their ribs!`);
  }
};

module.exports = {
  id: 'dispel_magic',
  name: 'Dispel Magic',
  level: 3,
  school: 'abjuration',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],
  range: 'medium',
  target: 'one spellcaster, creature, or object; or 20-ft. radius burst',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,
  onCast(state, caster, target) {
    // Logic: Caster Level Check (1d20 + CL vs 11 + Spell's CL)
    const effects = target.effects;
    effects.forEach(effect => {
       if (state.Dice.dispelCheck(caster, effect)) {
         effect.remove();
         caster.say(`You successfully unravel the ${effect.name} on ${target.name}.`);
       }
    });
  }
};

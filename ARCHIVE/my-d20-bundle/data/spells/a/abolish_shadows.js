/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Dispels shadow-based spells and forces shadow-beings into a weakened state.
 * Source: WotC | City of Splendors: Magister p.32 / 3.5 Conversion
 */
module.exports = {
  id: 'abolish_shadows',
  name: 'Abolish Shadows',
  level: 3,
  school: 'abjuration',
  subschool: null,
  descriptors: ['light'],
  source: 'WotC | City of Splendors: Magister',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Cleric: 3
   * - Sun Domain: 3
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { 
      id: 'phosphorescent_moss', 
      quantity: 5, 
      consumed: true, 
      notes: 'Five sprigs of glowing moss to seed the burst.' 
    }
  ],

  range: 'medium',
  target: '20-ft. radius burst',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("<bold><white>You crush the glowing moss in your palm, releasing a blinding flash of pure, purifying radiance.</white></bold>");
    caster.room.emitExcept(caster, `<bold><white>${caster.name} releases a wave of brilliant white light that scours every corner of the room.</white></bold>`);

    // Logic: Identify and remove 'shadow' type effects from characters
    for (const unit of caster.room.characters) {
      const shadowEffects = Array.from(unit.effects.effects).filter(e => 
        e.config.family === 'shadow' || e.config.name.toLowerCase().includes('shadow')
      );

      if (shadowEffects.length > 0) {
        shadowEffects.forEach(e => e.remove());
        unit.say("<cyan>The oppressive shadows clinging to you dissolve in the sudden light.</cyan>");
      }

      // Special interaction with shadow-typed creatures
      if (unit.getMeta('type') === 'shadow') {
        const damage = state.Dice.roll('1d6') * Math.min(caster.level, 10);
        state.Damage.apply({ amount: damage, type: 'energy', attacker: caster, target: unit, source: this.name });
        unit.say("<red>The pure light sears your nebulous form!</red>");
      }
    }
  }
};

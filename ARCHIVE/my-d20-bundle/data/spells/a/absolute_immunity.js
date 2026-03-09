/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Grants complete immunity to all weapons and spells of 4th level or lower.
 * Source: AD&D 2E Wizard's Spell Compendium | 3.5 Conversion
 */
module.exports = {
  id: 'absolute_immunity',
  name: 'Absolute Immunity',
  level: 9,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: "WotC | Wizard's Spell Compendium (2E)",

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 9
   * - Protection Domain: 9
   */

  castingTime: 'standard',
  components: ['V', 'S', 'F'],
  materialComponents: [],
  
  focus: {
    id: 'cold_iron_scepter',
    name: 'Cold Iron Scepter',
    minValue: 500,
    consumed: false
  },

  range: 'personal',
  target: 'self',
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("<bold><cyan>You strike your scepter against the ground, anchoring a field of absolute physical and magical rejection around your soul.</cyan></bold>");
    caster.room.emitExcept(caster, `<cyan>A faint, impenetrable diamond-sheen hardens over ${caster.name}'s form.</cyan>`);

    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const immunityEffect = state.EffectFactory.create('absolute_immunity_buff', {
      duration: cl * 6000
    });
    
    caster.addEffect(immunityEffect);
  }
};

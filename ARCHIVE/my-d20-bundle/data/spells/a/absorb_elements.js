/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Captures incoming elemental energy to bolster your next strike.
 * Source: WotC | Elemental Evil Player's Companion
 */
module.exports = {
  id: 'absorb_elements',
  name: 'Absorb Elements',
  level: 1,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'Princes of the Apocalypse',

  /**
   * SPELL LISTS:
   * - Druid: 1
   * - Ranger: 1
   * - Sorcerer/Wizard: 1
   */

  castingTime: 'swift', // Equivalent to 5E Reaction
  components: ['S'],
  materialComponents: [],

  range: 'personal',
  target: 'self',
  duration: '1 round',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("<cyan>You weave your hands in a protective ward, ready to pull the sting from the next elemental strike.</cyan>");
    
    const absorbEffect = state.EffectFactory.create('absorbed_energy', {
      duration: 6000
    });
    
    caster.addEffect(absorbEffect);
  }
};

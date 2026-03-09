/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Enhances the target's cognitive stability and mental acuity.
 * Source: 2E/3.5E Hybrid Homebrew | Mentzer Era Archives
 * 
 * Logic:
 * - Grants a bonus to all Intelligence and Wisdom based skill checks.
 * - Provides a "Mental Buffer" against Sanity damage.
 */

const { MIND } = require('../../lib/combat/damage-types');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'able_minded',
  name: 'Able-Minded',
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: [MIND],
  source: 'Mentzer Era Archives | 3.5 Conversion',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Bard: 2
   * - Knowledge Domain: 2
   * - Mind Domain: 2
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'phosphorescent_moss', 
      quantity: 1, 
      consumed: true, 
      notes: 'A sprig of glowing moss, thought to stimulate the brain.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'creature touched',
  area: null,
  duration: '10 min./level',
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    caster.say(`<cyan>You press the cool, glowing moss to ${target.name}'s temples, whispering a mnemonic trigger.</cyan>`);
    caster.room.emitExcept([caster, target], `<cyan>${caster.name} touches ${target.name}'s brow; for a moment, a faint, rhythmic pulse of blue light emanates from the point of contact.</cyan>`);

    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    const ableMindedEffect = state.EffectFactory.create('able_minded_buff', {
      duration: cl * 10 * 60000, // 10 mins per level
    });
    
    target.addEffect(ableMindedEffect);
    target.say("<bold><white>The fog in your mind clears instantly. Thoughts that were sluggish now snap into focus with crystalline clarity.</white></bold>");
  }
};

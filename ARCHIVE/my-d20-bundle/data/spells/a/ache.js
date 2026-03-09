/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Ache
 * Source: Book of Vile Darkness p.84 | 3.5 Conversion
 * 
 * Logic:
 * - Target: One living creature.
 * - Effect: Target takes a -2 penalty on attack rolls, saving throws, 
 *   skill checks, and ability checks due to persistent pain.
 * - Interaction: If the target is already 'Shaken', the penalty to Will 
 *   saves increases to -4.
 */

const { Broadcast } = require('ranvier');
const { MIND } = require('../../lib/combat/damage-types');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'ache',
  name: 'Ache',
  level: 1,
  school: 'necromancy',
  subschool: null,
  descriptors: [MIND, 'evil'],
  source: 'WotC | Book of Vile Darkness p.84',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Cleric: 1
   * - Pain Domain: 1
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'rusted_needle', 
      quantity: 1, 
      consumed: true, 
      notes: 'A rusted iron needle, snapped in half during the casting.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'close',
  target: 'one living creature',
  area: null,
  duration: '1 round/level',
  savingThrow: 'fortitude negates',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const { savePassed } = ctx;

    // Narrative: Caster & Room
    Broadcast.sayAt(caster, `<magenta>You snap a rusted needle between your fingers, focusing the sharp sensation into a dull, throbbing weight within ${target.name}'s joints.</magenta>`);
    Broadcast.sayAtExcept(caster.room, `<magenta>${caster.name} snaps a small needle, and a visible ripple of grey energy strikes ${target.name}.</magenta>`, [caster, target]);

    if (savePassed) {
      Broadcast.sayAt(target, "<white>A sharp pang shoots through your body, but it passes as quickly as it arrived.</white>");
      Broadcast.sayAt(caster, `<yellow>${target.name} shrugs off the necrotizing pain.</yellow>`);
      return;
    }

    // Perspective Emote: Target
    Broadcast.sayAt(target, "<red>A deep, throbbing ache settles into your bones. Every movement is a chore, and your focus begins to fray under the constant discomfort.</red>");
    
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    // Apply the "Aching" Effect
    const acheEffect = state.EffectFactory.create('aching_pain', {
      duration: cl * 6000, 
    });
    
    target.addEffect(acheEffect);
  }
};

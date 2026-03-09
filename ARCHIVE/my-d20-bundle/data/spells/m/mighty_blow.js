/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Mighty Blow
 * Author: Andrew Hamilton
 * Source: & Magazine Issue 1, p.41
 * 
 * Logic:
 * - Single Use: Provides a bonus to the next successful unarmed strike.
 * - Damage: +1 hp per caster level (Max +12).
 * - Stunning: Caster's level is added to Strength for stun/knockout checks.
 * - Knockdown: Target must save vs. Fortitude or be knocked Prone.
 * - Window: Stay active for 1 round / 3 levels or until the blow lands.
 */

const { Broadcast: B } = require('ranvier');
const { KINETIC } = require('../../lib/combat/damage-types');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'mighty_blow',
  name: 'Mighty Blow',
  level: 1,
  school: 'conjuration',
  subschool: 'summoning',
  descriptors: ['martial', 'force'],
  source: '& Magazine Issue 1, p.41',

  /**
   * SPELL LISTS:
   * - Magic-User/Wizard: 1
   * - Cleric (Battle/Strength): 2
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '1 segment', // ~1 round
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'mule_tail_hair', 
      quantity: 3, 
      consumed: true,
      notes: 'A few hairs from a mule’s tail.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'self', // Buffs the caster's next strike
  duration: '1 round / 3 levels (or until discharged)',
  savingThrow: 'fortitude negates (knockdown only)',
  spellResistance: false,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const durationRounds = Math.max(1, Math.floor(cl / 3));

    B.sayAt(caster, `<red>You wind the mule hairs around your knuckles and chant a word of impact. Your fist begins to glow with a heavy, pulsating red light.</red>`);
    B.sayAtExcept(caster.room, `<red>${caster.name}'s hand suddenly seems larger, heavy with an invisible, crushing weight.</red>`, [caster]);

    const blowEffect = state.EffectFactory.create('mighty_blow_active', {
      duration: durationRounds * 6000,
      state: { casterLevel: cl }
    });

    caster.addEffect(blowEffect);
  }
};

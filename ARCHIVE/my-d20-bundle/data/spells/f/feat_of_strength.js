/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Feat of Strength
 * Author: Andrew Hamilton
 * Source: & Magazine Issue 1, p.40
 * 
 * Logic:
 * - Target: One person.
 * - Bonus: 1d4 + (CL / 3) Strength.
 * - Scaling: Duration is 1 round + 1 round per 3 levels.
 * - Unique: Specifically allowed to exceed racial/natural maximums.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'feat_of_strength',
  name: 'Feat of Strength',
  level: 1,
  school: 'transmutation',
  subschool: 'alteration',
  descriptors: ['physical', 'buff'],
  source: '& Magazine Issue 1, p.40',

  /**
   * SPELL LISTS:
   * - Magic-User/Wizard: 1
   * - Sorcerer: 1
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '1 segment', // ~1 round
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'strong_animal_tuft', 
      quantity: 1, 
      consumed: true,
      notes: 'Fur or hair from a strong animal (bull, bear, giant).' 
    },
    {
      id: 'iron_wire',
      quantity: 1, // ~1 inch
      consumed: true,
      notes: 'Iron wire wrapped around the tuft.'
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: '30 ft.', // 3" in 2E
  target: 'one person',
  duration: '1 round + 1 round / 3 levels',
  savingThrow: 'none',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    // Logic: 1d4 + floor(CL/3)
    const strBonus = state.Dice.roll('1d4') + Math.floor(cl / 3);
    const durationRounds = 1 + Math.floor(cl / 3);

    B.sayAt(caster, `<red>You crush the iron-wrapped fur in your fist, and a surge of raw, bestial power flows from your hand into ${target.name}!</red>`);
    B.sayAt(target, `<bold><red>Your muscles swell and harden with the density of iron. You feel capable of rending stone with your bare hands!</red></bold>`);
    B.sayAtExcept(caster.room, `<red>${target.name}'s frame expands visibly, veins pulsing with a sudden, titan-like vigor.</red>`, [caster, target]);

    const featEffect = state.EffectFactory.create('feat_of_strength_active', {
      duration: durationRounds * 6000,
      modifiers: {
        // This is a "Feat" bonus, intentionally unique to stack with common items
        strength: (curr) => curr + strBonus
      }
    });

    target.addEffect(featEffect);
  }
};

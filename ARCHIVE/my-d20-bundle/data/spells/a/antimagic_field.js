/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * An invisible multispherical field that surrounds the caster and prevents 
 * the functioning of any magic items or spells within its confines.
 */
const DamageTypes = require('../../lib/combat/damage-types');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'antimagic_field',
  name: 'Antimagic Field',
  level: 6,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'PHB | p. 200',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 6
   * - Cleric: 8
   * - Magic Domain: 6
   * - Protection Domain: 6
   * - Rarity: Rare
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M/DF'],
  
  materialComponents: [
    { 
      id: 'iron_filings', 
      quantity: 1, 
      consumed: true, 
      notes: 'A pinch of iron filings or powdered iron.' 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  area: '10-ft. radius emanation centered on you',
  duration: '10 min./level',
  savingThrow: 'none',
  spellResistance: false, // Magic simply does not exist inside the field.

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const casterLevel = caster.getMeta('level') || 1;
    const durationMs = (10 * casterLevel) * 60 * 1000;

    const effect = state.EffectFactory.create('antimagic_field_effect', {
      config: { 
        name: "Antimagic Field",
        duration: durationMs 
      },
      state: {
        radius: 10,
        casterId: caster.id
      }
    });

    caster.addEffect(effect);
  }
};

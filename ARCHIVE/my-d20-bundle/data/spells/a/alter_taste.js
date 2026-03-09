'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A minor glamer that overrides the gustatory nerves of anyone consuming the 
 * targeted meal. It provides a subjective, pleasant flavor profile while 
 * leaving the physical and nutritional integrity of the food unchanged.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'alter_taste',
  name: 'Alter Taste',
  level: 0,
  school: 'illusion',
  subschool: 'glamer',
  descriptors: [],
  source: 'Rite Publishing | 101 0-Level Spells p. 4',

  /**
   * SPELL LISTS:
   * - Bard: 0
   * - Sorcerer/Wizard: 0
   * - Rarity: Common
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'salt_spice_pinch', 
      quantity: 1, 
      consumed: true, 
      notes: 'A pinch of salt or spice.' 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close',
  target: 'one meal of 1 cu. ft./level',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'will-negates (harmless)',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // Validation: Target must have edible behavior
    if (!target.hasBehavior('edible')) {
      caster.say("<yellow>The spell slides off. You can only alter the taste of things meant to be consumed.</yellow>");
      return;
    }

    caster.say(`<cyan>You whisper a soft glamer over the ${target.name}. A faint, savory aroma wafts from it momentarily.</cyan>`);
    
    // Apply the condition to the item
    const effect = state.EffectFactory.create('altered_taste_condition', target);
    target.addEffect(effect);

    // Timestamp for canonical interaction: items added after this are not masked
    target.setMeta('glamer_sealed_at', Date.now());
  }
};

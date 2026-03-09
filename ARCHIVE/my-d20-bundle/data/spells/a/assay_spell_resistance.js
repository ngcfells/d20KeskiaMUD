'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Provides a +10 enhancement bonus on caster level checks made to overcome
 * the spell resistance of a specific, designated target.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'assay_spell_resistance',
  name: 'Assay Spell Resistance',
  level: 4,
  school: 'divination',
  descriptors: [],
  source: 'Spell Compendium p. 17',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 4
   * - Rarity: Uncommon (High Arcanist tactics)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'swift',
  components: ['V', 'S'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  area: null,
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // Requires a designated target at the moment of casting
    const designatedTarget = ctx.target; 
    if (!designatedTarget || designatedTarget === caster) {
      return caster.say("<yellow>You must designate a specific foe to assay.</yellow>");
    }
    
    caster.say(`<cyan>Your vision shifts, highlighting the microscopic fractures and resonant flaws in ${designatedTarget.name}'s magical defenses.</cyan>`);

    const effect = state.EffectFactory.create('assay_sr_buff', caster, {
      duration: (1 * 6000) * caster.level, // 1 round per level (6s ticks)
      state: { targetId: designatedTarget.id }
    });

    caster.addEffect(effect);
  }
};

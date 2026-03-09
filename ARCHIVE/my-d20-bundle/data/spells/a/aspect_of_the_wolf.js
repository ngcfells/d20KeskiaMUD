'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * You take on the form of a wolf. Your stats change to Str 13, Dex 15, Con 15.
 * You gain a +2 enhancement bonus to natural armor, and the Trip ability.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'aspect_of_the_wolf',
  name: 'Aspect of the Wolf',
  level: 1,
  school: 'transmutation',
  subschool: 'polymorph',
  descriptors: [],
  source: 'Spell Compendium p. 16',

  /**
   * SPELL LISTS:
   * - Druid: 1
   * - Ranger: 1
   * - Rarity: Common (Wilderness)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  
  materialComponents: [], // Uses Divine Focus (DF)

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  area: null,
  duration: '10 min/level',
  savingThrow: 'none',
  spellResistance: false,

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
    caster.say("<green>Your muzzle elongates and coarse fur sprouts from your skin as you drop to all fours. The spirit of the predator takes hold.</green>");
    
    // Create the polymorph effect
    const effect = state.EffectFactory.create('aspect_of_the_wolf_active', caster, {
      duration: (10 * 60000) * caster.level // 10 min per level in ms
    });

    caster.addEffect(effect);
  }
};

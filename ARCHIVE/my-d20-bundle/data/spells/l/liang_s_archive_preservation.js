/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Liang's Archive Preservation
 * Source: Homebrew | Author: Chris Fells (2026)
 * 
 * Encloses a book, scroll, or map in a microscopic, persistent field 
 * of abjuration. The object becomes immune to the elements and 
 * significantly harder to damage physically, ensuring knowledge 
 * survives the collapse of civilizations.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  id: 'liang_s_archive_preservation',
  name: "Liang's Archive Preservation",
  level: 2,
  school: 'abjuration',
  subschool: null,
  descriptors: [], 
  source: 'Homebrew | Chris Fells | 2026',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Bard: 2
   * - Knowledge Domain: 2
   * - Archive Domain: 1
   */

  castingTime: '1 minute',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'clear_resin_drop', 
      quantity: 1, 
      consumed: true, 
      notes: 'A drop of clear tree resin and a pinch of fine sand.' 
    }
  ],

  range: 'touch',
  target: 'one book, scroll, or paper object',
  area: null,
  duration: 'permanent', 
  savingThrow: 'none (object)',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    // 1. Validation: Must be a paper-based or fragile knowledge object
    if (!target.hasTag('document') && !target.hasTag('book') && !target.hasTag('scroll')) {
      return caster.say("This magic only binds to the fibers of parchment and the ink of scholars.");
    }

    const preservationEffect = state.EffectFactory.create('archive_preservation_effect', {
      duration: Infinity, // Permanent
      state: { casterId: caster.id }
    });

    if (target.addEffect(preservationEffect)) {
      // Perspective: Caster
      caster.say(`<cyan>You trace a shimmering line of resin along the spine of ${target.name}. A microscopic field of stasis hums into existence, sealing the ink forever.</cyan>`);
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<cyan>${caster.name} carefully seals ${target.name} in a faint, crystalline aura of protection.</cyan>`);

      // 2. Mechanical Flags
      target.setMeta('is_preserved', true);
      target.setMeta('hardness_bonus', (target.getMeta('hardness_bonus') || 0) + 10);
    }
  }
};

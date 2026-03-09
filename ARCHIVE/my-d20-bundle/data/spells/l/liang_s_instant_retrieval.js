/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Designed as the logistical companion to 'Cataloging Gaze'. 
 * This spell allows the arcanist to instantly teleport a literary 
 * work from their immediate surroundings into their 'Dimensional 
 * Pocket Library' without physical contact.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_instant_retrieval',
  name: "Liang's Instant Retrieval",
  level: 1,
  school: 'conjuration',
  subschool: 'teleportation',
  descriptors: [],
  source: 'Homebrew | Chris Fells 2026',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Bard: 1
   * - Knowledge Domain: 1
   * - Rarity: Rare (Liang Sect Signature)
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
  range: 'close', // 25 ft + 5 ft/2 levels
  target: 'one book, scroll, or tome',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'will-negates (object)',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // 1. Verify Target: Must be a literary item
    const isLiterary = target.getMeta('isBook') || target.getMeta('isScroll') || target.getMeta('isTome');
    
    if (!isLiterary) {
      caster.say(`<red>${target.name} lacks the intellectual weight required for the Catalog's resonance.</red>`);
      return;
    }

    // 2. Ownership/Guard Check
    if (target.owner && target.owner !== caster) {
        caster.say(`<red>${target.name} is currently held by ${target.owner.name}; the retrieval fails.</red>`);
        return;
    }

    // 3. Execution: Teleport to Dimensional Library
    const library = caster.getMeta('dimensional_library') || [];
    const bookId = target.getMeta('catalogId') || target.name;

    // Narrative Emotes
    caster.say(`<cyan>You snap your fingers, speaking a precise coordinate in the High Shou dialect. ${target.name} shudders and dissolves into a swirl of silver ink-vapors.</cyan>`);
    caster.room.broadcastExcept(caster, `<cyan>${caster.name} snaps their fingers at ${target.name}. The object instantly collapses into a fine, silver mist and vanishes.</cyan>`);

    // Add to library meta and remove from room
    if (!library.includes(bookId)) {
        library.push(bookId);
        caster.setMeta('dimensional_library', library);
    }
    
    caster.say(`<white>[Catalog Update] ${target.name} has been successfully archived.</white>`);
    target.remove();
  }
};

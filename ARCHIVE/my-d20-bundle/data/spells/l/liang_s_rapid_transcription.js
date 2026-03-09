/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A specialized transmutation developed for the rapid expansion of the 
 * Liang Archive. Rather than duplicating the physical object, this spell 
 * liquifies ink from a masterwell and 'pours' it onto blank pages, 
 * perfectly mimicking the script, diagrams, and marginalia of the 
 * source material at a supernatural speed.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_rapid_transcription',
  name: "Liang's Rapid Transcription",
  level: 3,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'Homebrew | Chris Fells 2026 (Liang Chou Signature)',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Knowledge Domain: 2
   * - Rarity: Rare (Liang Sect Scribes)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: '1 minute',
  components: ['V', 'S', 'F'],
  focus: {
    id: 'arcanist_inkwell',
    notes: 'A master inkwell and sufficient blank scrolls/books for the copies.'
  },

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one bookshelf or stack of literary objects',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

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
    const libraryMeta = caster.getMeta('dimensional_library') || [];
    const roomItems = caster.room.items;
    
    // 1. Filter for valid literary targets in the stack/shelf
    const sources = [...roomItems].filter(item => 
        item.getMeta('isBook') || item.getMeta('isScroll') || item.getMeta('isTome')
    ).slice(0, 50); // Cap at 50 per 3.5e/2026 balance

    if (sources.length === 0) {
        caster.say("<red>There is no legible text here to transcribe.</red>");
        return;
    }

    // EMOTES: SUCCESSFUL CASTING
    caster.say("<cyan>You trace a wide, sweeping circle in the air. Ink leaps from your well, flowing like a miniature, midnight river that splits into fifty distinct streams, each seeking out a blank page in your satchel.</cyan>");
    caster.room.broadcastExcept(caster, `<cyan>${caster.name} conducts a complex somatic rite. Ink surges from their inkwell, weaving through the air in a mesmerizing lattice of script before diving into their open bags.</cyan>`);

    let copyCount = 0;
    sources.forEach(source => {
        // Check for magical protection (e.g. Arcane Mark or Protection from Scrying)
        if (source.hasEffect('arcane_lock_seal') || source.getMeta('isArtifact')) {
            caster.say(`<grey>[Blocked] ${source.name} resists the ink's touch; its secrets are guarded.</grey>`);
            return;
        }

        // Logic: Add to the 'Dimensional Library' meta rather than physical items 
        // if the caster prefers, or create new physical items.
        const catalogId = source.getMeta('catalogId') || source.name;
        if (!libraryMeta.includes(catalogId)) {
            libraryMeta.push(catalogId);
            copyCount++;
        }
    });

    caster.setMeta('dimensional_library', libraryMeta);
    caster.say(`<yellow>[Transcription Complete] ${copyCount} volumes have been indexed and copied into your records.</yellow>`);
  }
};

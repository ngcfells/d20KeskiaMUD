/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Derived from Liang Chou's mastery of Planar and Netherese magics.
 * This spell allows the arcanist to briefly interface with their
 * 'Dimensional Archive'—a personal sub-plane of the Astral Sea where
 * their collected knowledge is stored.
 */
const BookItemAdapter = require('../../../lib/library/BookItemAdapter');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_pocket_library',
  name: "Liang's Dimensional Pocket Library",
  level: 5,
  school: 'conjuration',
  subschool: 'summoning',
  descriptors: ['planar'],
  source: 'Homebrew | Chris Fells 2026 (Liang Chou Signature)',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 5
   * - Bard: 5
   * - Knowledge Domain: 5
   * - Rarity: Artifact (Unique to the Liang Sect)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'swift',
  components: ['S'], // A precise "retrieval" gesture.
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  area: null,
  duration: 'instantaneous', // Retrieval is instant; item persists in hand.
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
    const requested = ctx?.args || null;

    // EMOTES: SUCCESSFUL CASTING
    caster.say("<cyan>You reach behind your shoulder, your hand disappearing into a shimmering, vertical rift of silver starlight that smells of old parchment and ozone.</cyan>");
    caster.room.broadcastExcept(caster, `<cyan>${caster.name} reaches into a localized tear in reality, their arm vanishing up to the elbow in a swirl of astral silver.</cyan>`);

    if (!requested) {
      caster.say("<white>[Catalog Alert] You must specify the title or ID of the volume you wish to retrieve.</white>");
      return;
    }

    // Access the Library Manager (Integrated with the 2026 Liang System)
    const libraryMeta = caster.getMeta('dimensional_library') || [];

    // Check if the caster actually has this book in their archive
    const bookEntry = libraryMeta.find(id => id.toLowerCase().includes(requested.toLowerCase()));

    if (!bookEntry) {
      caster.say(`<red>The Archive remains silent. No volume matching '${requested}' is currently indexed in your library.</red>`);
      return;
    }

    // Convert the metadata/ID into a physical item object
    // Assuming BookItemAdapter handles the conversion from the Archive DB to an Item instance
    const item = BookItemAdapter.bookToItem(state, bookEntry);

    if (item) {
      caster.addItem(item);

      // PERSPECTIVE EMOTES: SUCCESSFUL RETRIEVAL
      caster.say(`<yellow>Your fingers close around the familiar spine of <white>${item.name}</white>. You withdraw it from the rift as the dimensional tear zips shut.</yellow>`);
      caster.room.broadcastExcept(caster, `<yellow>${caster.name} pulls a physical volume, <white>${item.name}</white>, out of thin air before the shimmering rift vanishes.</yellow>`);
    } else {
      caster.say("<red>The retrieval failed. The text may be magically suppressed or the Archive is currently unstable.</red>");
    }
  }
};

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * An advanced bibliomantic divination used by the Archivists of Liang.
 * The caster's eyes pulse with a rapid, strobe-like silver light,
 * cross-referencing every visible spine, scroll-tube, and leaf in the room
 * against their existing dimensional library.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_cataloging_gaze',
  name: "Liang's Cataloging Gaze",
  level: 2,
  school: 'divination',
  subschool: null,
  descriptors: [],
  source: 'Homebrew, Chris Fells 2026',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Bard: 2
   * - Knowledge Domain: 2
   * - Rarity: Rare (Specific to the Liang Sect)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'swift',
  components: ['S'], // Only Somatic: A rapid, circular gesture over the eyes.
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  area: 'Room emanation',
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
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const room = caster.room;
    const inventory = caster.getMeta('dimensional_library') || [];

    // 1. Narrative Emotes
    caster.say("<cyan>You sweep two fingers across your eyes. Your vision fractures into thousands of analytical panes, flicking through titles and authors with the speed of a rushing wind.</cyan>");
    room.broadcastExcept(caster, `<cyan>${caster.name}'s eyes suddenly pulse with a rapid, silver strobe-light, illuminating every book and scroll in the room for a fraction of a second.</cyan>`);

    // 2. Identify Book-type Items
    const itemsInRoom = [...room.items];
    const literaryItems = itemsInRoom.filter(item =>
      item.getMeta('isBook') ||
      item.getMeta('isScroll') ||
      item.getMeta('isTome')
    );

    if (literaryItems.length === 0) {
      caster.say("<white>Your gaze settles. No worthy additions to the Catalog were found here.</white>");
      return;
    }

    caster.say("<white>--- Cataloging Results ---</white>");

    literaryItems.forEach(book => {
      const bookId = book.getMeta('catalogId') || book.name;
      const isKnown = inventory.includes(bookId);
      const value = book.getMeta('cost') || 0;

      if (!isKnown) {
        // Highlight NEW additions
        caster.say(`<magenta>[NEW]</magenta> <yellow>${book.name}</yellow> - Estimated Value: <white>${value}gp</white>`);
        // Optional: Provide a hint about the contents
        const subject = book.getMeta('subject') || 'General Literature';
        caster.say(`  <grey>Subject: ${subject}</grey>`);
      } else {
        // Mark as Duplicates
        caster.say(`<cyan>[ARCHIVED]</cyan> <white>${book.name}</white> (Duplicate)`);
      }
    });

    caster.say("<white>--------------------------</white>");
  }
};

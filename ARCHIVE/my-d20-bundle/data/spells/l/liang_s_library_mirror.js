/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A masterwork of archival magic. Rather than physical theft, this 
 * spell performs a high-fidelity 'Planar Duplication' of every 
 * literary signature in the room. It maps the ink, the parchment 
 * age, and the magical imprints of a collection, transmitting 
 * the 'Idea' of the library directly into the Liang Archive.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_library_mirror',
  name: "Liang's Library Mirror",
  level: 7,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: ['planar'],
  source: 'Homebrew | Chris Fells 2026 (Liang Chou Signature)',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 7
   * - Knowledge Domain: 7
   * - Rarity: Artifact (Unique to Liang Chou's Inner Circle)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: '1 hour',
  components: ['V', 'S', 'M', 'XP'],
  
  materialComponents: [
    { 
      id: 'mercury_mirror_shard', 
      quantity: 1, 
      minValue: 100, 
      consumed: true, 
      notes: 'A silver-backed mirror shard dipped in quicksilver.' 
    }
  ],
  xpCost: 500,

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one library or archive room',
  area: 'up to a 60-ft. cube',
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
    const room = caster.room;
    const libraryMeta = caster.getMeta('dimensional_library') || [];
    let count = 0;

    // EMOTES: SUCCESSFUL CASTING
    caster.say("<magenta>You shatter the mercury mirror at your feet, and the hour of chanting reaches its zenith. A sound like a thousand pages turning at once fills the room.</magenta>");
    
    room.broadcastExcept(caster, `<magenta>${caster.name} spreads their arms wide. A silver ripple, like the surface of a disturbed pond, sweeps across the bookshelves. Every volume bleeds a ghostly, translucent twin that flies into ${caster.name}'s flowing sleeves.</magenta>`);

    // Scan for all literary items in the room
    const items = [...room.items];
    items.forEach(item => {
      const isLiterary = item.getMeta('isBook') || item.getMeta('isScroll') || item.getMeta('isTome');
      
      if (isLiterary) {
        const bookId = item.getMeta('catalogId') || item.name;
        if (!libraryMeta.includes(bookId)) {
          libraryMeta.push(bookId);
          count++;
        }
      }
    });

    // Update the Archive
    caster.setMeta('dimensional_library', libraryMeta);

    // Final Report
    if (count > 0) {
      caster.say(`<white>[Archive Mirror Complete]</white> <yellow>${count} new volumes have been perfectly indexed and duplicated into your Dimensional Library.</yellow>`);
    } else {
      caster.say("<white>The Mirror settles. No new signatures were found in this collection.</white>");
    }
  }
};

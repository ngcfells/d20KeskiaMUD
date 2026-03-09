/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Synthesizing Netherese Chronomancy and High Shou Divination.
 * This spell reaches back through the temporal echo of an object
 * to retrieve its 'First Edition' state—the moment it was finalized
 * by its creator. It bypasses fire damage, rot, and even magical
 * 'Erase' effects by pulling the platonic ideal of the knowledge
 * back into the physical realm.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_echoes',
  name: "Liang's Echoes of the First Edition",
  level: 5,
  school: 'divination',
  subschool: 'scrying',
  descriptors: ['temporal'],
  source: 'Homebrew | Chris Fells 2026 (Liang Chou Signature)',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 5
   * - Bard: 5
   * - Knowledge Domain: 5
   * - Rarity: Artifact (Liang Chou's Personal Restoration Rite)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: '1 minute',
  components: ['V', 'S', 'M'],

  materialComponents: [
    {
      id: 'book_ash_pinch',
      quantity: 1,
      consumed: true,
      notes: 'A pinch of ash from a burnt book or scroll.'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one book, scroll, or document (including fragments)',
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
    // 1. Verify Target: Must be literary or a fragment of such
    const isLiterary = target.getMeta('isBook') || target.getMeta('isScroll') || target.getMeta('isFragment');

    if (!isLiterary) {
      caster.say("<red>The echoes of this object hold no literary weight; there is no 'First Edition' to retrieve.</red>");
      return;
    }

    // 2. Temporal Restoration Logic
    // This removes 'burnt', 'water_damaged', or 'erased' metas and restores text
    const originalText = target.getMeta('originalContent');
    const wasDamaged = target.getMeta('isDamaged') || target.getMeta('isIllegible');

    // EMOTES: SUCCESSFUL CASTING
    caster.say(`<cyan>You sprinkle the ash over the remains of ${target.name}, speaking the High Shou syllables for 'Genesis'. The air thrums with a chronomantic pulse.</cyan>`);

    if (wasDamaged && originalText) {
      caster.say(`<white>Before your eyes, the charred edges of ${target.name} knit themselves back together. Ink rises from the fibers like mist, settling into perfectly legible, sharp script. The 'idea' of the book is made manifest.</white>`);

      target.removeMeta('isDamaged');
      target.removeMeta('isIllegible');
      target.setMeta('content', originalText);

      target.room.broadcastExcept(caster, `<cyan>${caster.name} touches the ruined ${target.name}. A silver ripple passes through the object, and for a moment, a ghostly image of a library in Cormyr overlaps the room as the document is restored to perfection.</cyan>`);
    } else {
      caster.say("<white>The document is already in its ideal state; the echoes merely hum in affirmation.</white>");
    }
  }
};

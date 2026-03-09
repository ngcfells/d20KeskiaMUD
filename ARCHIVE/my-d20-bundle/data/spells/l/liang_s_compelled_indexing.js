/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A sophisticated Liang technique that treats a sentient mind as a 
 * disorganized archive. The victim is compelled to sit and 
 * methodically transcribe their specialized knowledge into a 
 * format compatible with the Liang Dimensional Library.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_compelled_indexing',
  name: "Liang's Compelled Indexing",
  level: 5,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting'],
  source: 'Homebrew | Chris Fells 2026',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 5
   * - Bard: 5
   * - Knowledge Domain: 5
   * - Rarity: Rare (Liang Sect Secret)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: '1 minute',
  components: ['V', 'S'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close',
  target: 'one intelligent creature (Int 3+)',
  area: null,
  duration: '1 hour/level',
  savingThrow: 'will-negates',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    if (ctx.savePassed) {
        caster.say(`<white>You attempt to index ${target.name}'s mind, but their mental partitions are too reinforced to bypass.</white>`);
        target.say(`<cyan>A cold, clinical pressure tries to organize your thoughts into rows and columns, but you push the alien logic aside.</cyan>`);
        return;
    }

    // SUCCESS EMOTES
    caster.say(`<magenta>You finish the final indexing mantra. ${target.name}'s eyes glaze over, turning a dull silver as their memories are forced into a linear, transcribable queue.</magenta>`);

    target.say(`<red>Your own thoughts begin to betray you, marching toward your hands in an unstoppable parade of facts and figures. You feel an overwhelming, hollow need to find a quill.</red>`);

    target.room.broadcastExcept([caster, target], `<magenta>${caster.name} whispers a series of rapid, clicking syllables. ${target.name} stops moving, their expression becoming eerily blank as they stare at the nearest flat surface.</magenta>`);

    const casterLevel = caster.getMeta('level') || 1;
    const durationMs = casterLevel * 60 * 60 * 1000;

    const effect = state.EffectFactory.create('compelled_scribe', {
      config: {
        name: "Compelled Indexing",
        duration: durationMs
      },
      state: {
          casterId: caster.id,
          subject: ctx.indexingSubject || 'General Biography'
      }
    });

    target.addEffect(effect);
  }
};

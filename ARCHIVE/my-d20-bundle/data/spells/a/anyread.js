/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Allows the caster to read any nonmagical writing, regardless of language.
 * The script appears to subtly shift and align into a familiar tongue 
 * when viewed through the focus.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'anyread',
  name: 'Anyread',
  level: 1,
  school: 'divination',
  subschool: null,
  descriptors: [],
  source: 'Spell Compendium | p. 14',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Bard: 1
   * - Knowledge Domain: 1
   * - Rarity: Common
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'F'],

  focus: {
    id: 'crystal_prism',
    value: 5,
    notes: 'A small glass or crystal prism.'
  },

  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  area: null,
  duration: '1 min./level',
  savingThrow: 'none',
  spellResistance: false,

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
    const casterLevel = caster.getMeta('level') || 1;
    const durationMs = casterLevel * 60 * 1000;

    // EMOTES: SUCCESSFUL CASTING
    caster.say("<cyan>You hold the prism to your eye and hum a low, resonant tone. The world blurs for a moment, then snaps into a hyper-focused clarity.</cyan>");
    caster.room.broadcastExcept(caster, `<cyan>${caster.name} lifts a small prism to their eye, peering intently at the air as a faint, shimmering light plays across their iris.</cyan>`);

    const effect = state.EffectFactory.create('anyread_active', {
      config: { 
        name: "Anyread",
        duration: durationMs 
      }
    });

    caster.addEffect(effect);
  },

  emotes: {
    reading: (caster, document) => {
      caster.say(`<yellow>As you look at ${document.name} through the prism, the alien script ripples like water, reforming into words you can perfectly understand.</yellow>`);
    },
    magicalBlock: (caster, document) => {
      caster.say(`<red>The prism turns opaque and vibrates painfully as you attempt to read the magical script on ${document.name}. Some secrets remain hidden.</red>`);
    }
  }
};

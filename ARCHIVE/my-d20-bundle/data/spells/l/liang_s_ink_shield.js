/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Utilizing a mixture of High Shou calligraphy and Thayan abjuration. 
 * The caster commands the ink within their focus to rise and orbit 
 * their body in a rapid, fluid vortex. This 'Living Ink' acts as a 
 * physical barrier and a visual deterrent, obscuring the caster's 
 * exact position.
 */
const Defense = require('../../../lib/combat/defense');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_ink_shield',
  name: "Liang's Living Ink Shield",
  level: 3,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'Homebrew | Chris Fells 2026 (Liang Chou Signature)',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Knowledge Domain: 3
   * - Rarity: Rare (Liang Sect arcanists)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'swift',
  components: ['S', 'F'],
  focus: {
    id: 'arcanist_inkwell',
    notes: 'An open inkwell containing at least one ounce of magical ink.'
  },
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  area: null,
  duration: '1 round/level',
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
    const durationMs = casterLevel * 6000; // 1 round (6s) per level

    // EMOTES: SUCCESSFUL CASTING
    caster.say("<cyan>You make a sharp, lifting gesture over your inkwell. A geyser of midnight-black fluid erupts, spinning into a violent, silent vortex that encircles you in a blur of obsidian ribbons.</cyan>");
    caster.room.broadcastExcept(caster, `<cyan>Ink leaps from ${caster.name}'s side, expanding into a swirling, three-dimensional cage of dark liquid that hums with a faint, papery resonance.</cyan>`);

    const effect = state.EffectFactory.create('ink_shield', {
      config: { 
        name: "Living Ink Shield",
        duration: durationMs 
      },
      state: {
        acBonus: 4,
        concealment: 20 // 20% Miss Chance
      }
    });

    caster.addEffect(effect);
  },

  emotes: {
    absorb: (target, attacker) => {
      target.say(`<blue>The swirling ink thickens at the point of impact, catching ${attacker.name}'s blow like a dense sponge.</blue>`);
      attacker.say(`<grey>Your strike is slowed and redirected by a ribbon of heavy, viscous ink before it can reach ${target.name}.</grey>`);
    },
    conceal: (target, attacker) => {
      attacker.say(`<white>You strike at ${target.name}, but the shifting shadows of the ink-vortex deceive your eye. You hit only empty air.</white>`);
    }
  }
};

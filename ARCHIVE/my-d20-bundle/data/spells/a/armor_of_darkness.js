/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * You shroud the subject in a flickering, shadowy field of dark energy.
 * This armor of shadow grants protection from physical attacks and 
 * bolsters the soul against the influence of good-aligned magic.
 */
const D20Utils = require('../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'armor_of_darkness',
  name: 'Armor of Darkness',
  level: 4,
  school: 'abjuration',
  subschool: null,
  descriptors: ['darkness', 'evil'],
  source: 'Spell Compendium | p. 15',

  /**
   * SPELL LISTS:
   * - Darkness Domain: 4
   * - Cleric: 4 (Evil)
   * - Rarity: Rare
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'creature touched',
  area: null,
  duration: '10 min./level',
  savingThrow: 'will-negates', // Harmless (usually)
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const casterLevel = caster.getMeta('level') || 1;
    const durationMs = (10 * casterLevel) * 60 * 1000;

    // EMOTES: SUCCESSFUL CASTING
    caster.say(`<magenta>You touch ${target.name}, and shadows within the room bleed toward your hand. You weave them into a tangible, flickering suit of obsidian mail.</magenta>`);
    
    target.say(`<red>Tendrils of living shadow wrap around your body like freezing plate armor. The light in the room dims to your eyes, replaced by a preternatural clarity in the dark.</red>`);
    
    target.room.broadcastExcept([caster, target], `<magenta>${caster.name} touches ${target.name}, and the surrounding shadows surge forward, forming a swirling, semi-translucent shell of darkness around them.</magenta>`);

    const effect = state.EffectFactory.create('darkness_shroud', {
      config: { 
        name: "Armor of Darkness",
        duration: durationMs 
      }
    });

    target.addEffect(effect);
  },

  emotes: {
    deflect: (target, attacker) => {
      target.say(`<cyan>The shadows surrounding you thicken as ${attacker.name} strikes, catching the blow in a pocket of absolute void.</cyan>`);
      attacker.say(`<grey>Your strike against ${target.name} is swallowed by the unnaturally dense shadows clinging to their form.</grey>`);
    },
    holyResist: (target) => {
        target.say(`<magenta>The holy light flickers and dies against your shroud of darkness, unable to pierce the gloom.</magenta>`);
    }
  }
};

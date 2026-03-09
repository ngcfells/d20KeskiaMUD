/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A cruel phantasm favored by Liang Chou for protecting restricted 
 * shelves. The caster creates a mental "redaction"—a psychic ink 
 * that bleeds across the target's visual cortex. The victim does 
 * not just go blind; they see a swirling, infinite sea of black 
 * ink-blots that expand to cover every person, object, and exit.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_scrivener_s_retribution',
  name: "Liang's Scrivener's Retribution",
  level: 4,
  school: 'illusion',
  subschool: 'phantasm',
  descriptors: ['mind-affecting', 'fear'],
  source: 'Homebrew | Chris Fells 2026 (Liang Chou Signature)',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 4
   * - Bard: 4
   * - Knowledge Domain: 4
   * - Rarity: Rare (Liang Sect Security)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'medium', // 100 ft + 10 ft/level
  target: 'one intelligent creature',
  area: null,
  duration: '1 min./level',
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
        caster.say(`<white>You release the phantasmal ink, but ${target.name} blinks away the shadows, their mind refusing the redaction.</white>`);
        target.say(`<cyan>A momentary spray of black spots flickers across your vision, but you shake your head and the world remains clear.</cyan>`);
        return;
    }

    // SUCCESS EMOTES
    caster.say(`<magenta>You speak a word of censorship and flick your fingers toward ${target.name}. A burst of spectral, oily ink erupts from thin air, splashing directly into their eyes.</magenta>`);
    
    target.say(`<red>A spray of midnight-black ink hits your face with the force of a physical blow. Instead of dripping away, the blots begin to grow, spreading across your vision until the entire world is redacted into total darkness.</red>`);
    
    target.room.broadcastExcept([caster, target], `<magenta>${caster.name} gestures sharply. A cloud of unnatural black fluid manifests around ${target.name}'s head, clinging to their eyes like a living mask.</magenta>`);

    const casterLevel = caster.getMeta('level') || 1;
    const durationMs = casterLevel * 60000;

    const effect = state.EffectFactory.create('ink_blindness', {
      config: { 
        name: "Scrivener's Retribution",
        duration: durationMs 
      },
      state: {
          casterId: caster.id
      }
    });

    target.addEffect(effect);
  }
};

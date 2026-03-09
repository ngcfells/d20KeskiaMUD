/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A surgical application of Thayan mental manipulation. 
 * Unlike 'Modify Memory', which is descriptive and slow, 
 * Liang's 'Mind-Edit' acts as a direct archival deletion. 
 * It treats the victim's consciousness as a document to be 
 * redacted, excising specific spans of time or sensitive data.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_mind_edit',
  name: "Liang's Mind-Edit",
  level: 4,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting', 'evil'],
  source: 'Homebrew | Chris Fells 2026 (Liang Chou Signature)',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 4
   * - Bard: 4
   * - Trickery Domain: 4
   * - Rarity: Rare (Liang Sect Ops)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['S'], // Entirely silent; a subtle, flickering finger movement.
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one intelligent creature',
  area: null,
  duration: 'permanent',
  savingThrow: 'will-negates',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    if (ctx.savePassed) {
        caster.say(`<white>You trace the redaction sigil, but ${target.name}'s mental integrity remains unbroken. They blink, sensing a momentary lapse in focus.</white>`);
        target.say(`<cyan>A strange, clinical coldness brushes against your forehead. For a second, you felt a tugging at your recent thoughts, but the sensation passes.</cyan>`);
        return;
    }

    // SUCCESS EMOTES
    caster.say(`<magenta>You trace a precise 'delete' sigil in the air before ${target.name}'s brow. Their pupils dilate and then go flatly blank, as if a lantern has been snuffed out behind their eyes.</magenta>`);
    
    target.say(`<red>A sudden, sharp static fills your mind. You find yourself standing here, but the last several minutes of your life have been replaced by a smooth, impenetrable wall of grey fog.</red>`);
    
    target.room.broadcastExcept([caster, target], `<magenta>${caster.name} makes a sharp, downward gesture toward ${target.name}'s face. The victim's expression instantly slackens into a state of total, vacant compliance.</magenta>`);

    // Application: Memory Gap Effect
    const effect = state.EffectFactory.create('memory_gap', {
      config: { 
        name: "Mind-Edit",
        duration: -1 // Permanent removal
      },
      state: {
          casterId: caster.id,
          redactedSpan: '10 minutes'
      }
    });

    target.addEffect(effect);
  }
};

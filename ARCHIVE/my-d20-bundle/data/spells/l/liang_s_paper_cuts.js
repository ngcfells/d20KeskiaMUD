/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A "petty" but excruciating evocation favored by Liang Chou. The caster 
 * flickers a single piece of parchment, and the paper fiber itself 
 * shatters into hundreds of microscopic, translucent Tai ji jian blades. 
 * These tiny force-constructs swarm the target, specifically targeting 
 * the joints and nerve endings with the precision of a master swordsman.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_paper_cuts',
  name: "Liang's Thousand Paper Cuts",
  level: 2,
  school: 'evocation',
  subschool: null,
  descriptors: ['force', 'pain'],
  source: 'Homebrew | Chris Fells 2026 (Liang Chou Signature)',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Bard: 2
   * - Knowledge Domain: 2
   * - Rarity: Uncommon (Liang Sect Disciplinary Rite)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'F'],
  focus: {
    id: 'razor_parchment',
    notes: 'A single sheet of high-quality, sharp-edged vellum or parchment.'
  },

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close',
  target: 'one living creature',
  area: null,
  duration: '1 round/level',
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
        caster.say(`<white>You flick the parchment, but ${target.name} ignores the microscopic steel-storm with a scoff.</white>`);
        target.say(`<cyan>A momentary itch, like brushing against stiff dry grass, touches your skin and vanishes.</cyan>`);
        return;
    }

    // SUCCESS EMOTES
    caster.say(`<magenta>You snap the parchment at ${target.name}. The paper shatters into a cloud of microscopic, ivory-colored Tai ji jian blades that swarm the target in a frantic, humming spiral.</magenta>`);
    
    target.say(`<red>A sudden, searing agony erupts across your hands! Dozens of tiny, razor-edged swords—no larger than a grain of rice—slice into your knuckles and face with surgical cruelty.</red>`);
    
    target.room.broadcastExcept([caster, target], `<magenta>${caster.name} snaps a piece of paper toward ${target.name}. The parchment dissolves into a shimmering cloud of tiny, translucent swords that begin flaying the victim's skin.</magenta>`);

    const casterLevel = caster.getMeta('level') || 1;
    const durationMs = casterLevel * 6000;

    const effect = state.EffectFactory.create('paper_cuts_bleed', {
      config: { 
        name: "Thousand Paper Cuts",
        duration: durationMs 
      },
      state: {
          casterId: caster.id,
          dexPenalty: -2
      }
    });

    target.addEffect(effect);
  },

  emotes: {
    bleedTick: (target) => {
      target.say(`<red>The microscopic jian blades continue to orbit you, finding the creases of your armor to deliver fresh, stinging lacerations.</red>`);
    }
  }
};

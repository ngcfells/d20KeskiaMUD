/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * You sharpen your perceptions to the point where your bow becomes 
 * an extension of your own body. You can fire in the thick of 
 * melee without fear and react to your enemies' openings with 
 * a notched arrow as easily as a brawler uses a fist.
 */
const D20Utils = require('../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'arrow_mind',
  name: 'Arrow Mind',
  level: 1,
  school: 'divination',
  subschool: null,
  descriptors: [],
  source: 'Spell Compendium | p. 15',

  /**
   * SPELL LISTS:
   * - Ranger: 1
   * - Sorcerer/Wizard: 1
   * - Elf Domain: 1
   * - Rarity: Common
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'swift',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'flint_arrowhead', 
      quantity: 1, 
      consumed: true, 
      notes: 'A tiny flint arrowhead.' 
    }
  ],

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
    caster.say("<cyan>You swallow the tiny flint arrowhead, and a cold, predatory focus snaps into place. Every movement of your enemies feels sluggish, predictable, and perfectly aligned with your bowstring.</cyan>");
    caster.room.broadcastExcept(caster, `<cyan>${caster.name} makes a sharp, whistling sound while tracing the string of their bow. Their eyes take on a sharp, hawk-like intensity, tracking every nearby movement with mechanical precision.</cyan>`);

    const effect = state.EffectFactory.create('arrow_mind_active', {
      config: { 
        name: "Arrow Mind",
        duration: durationMs 
      }
    });

    caster.addEffect(effect);
  },

  emotes: {
    aooTrigger: (caster, target) => {
      caster.say(`<yellow>As ${target.name} leaves themselves open, your hands move in a blur, snapping an arrow into place and firing before they can react!</yellow>`);
      target.say(`<red>You overextend, and in that heartbeat, you see ${caster.name} already has an arrow leveled at your throat from point-blank range!</red>`);
    },
    noProvoke: (caster) => {
        caster.say("<white>You casually notch and fire your bow while dodging a blade; your focus is so absolute that your enemies find no opening to strike.</white>");
    }
  }
};

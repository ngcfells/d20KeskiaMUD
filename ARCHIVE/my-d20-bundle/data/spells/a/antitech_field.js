/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Creates an invisible, humming field that dampens all electronic 
 * and mechanical-digital activity.
 */
const D20Utils = require('../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'antitech_field',
  name: 'Antitech Field',
  level: 6,
  school: 'abjuration',
  subschool: null,
  descriptors: ['technological'],
  source: 'Modern d20',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 6
   * - Tech Domain: 6
   * - Cyber-Shaman: 6
   * - Rarity: Rare (High-Tech / Spelljammer campaigns)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'copper_coil', 
      quantity: 1, 
      consumed: true, 
      notes: 'A small, tightly wound copper coil.' 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  area: '10-ft. radius emanation centered on you',
  duration: '10 min./level',
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
    const durationMs = (10 * casterLevel) * 60 * 1000;

    // CASTING EMOTES
    caster.say("<cyan>You crush the copper coil in your palm, speaking a word of static. A high-pitched whine erupts from your hand before settling into a heavy, local silence.</cyan>");
    caster.room.broadcastExcept(caster, `<cyan>A sudden surge of ozone fills the air as ${caster.name} releases a wave of blue static. Nearby displays flicker and die instantly.</cyan>`);

    const effect = state.EffectFactory.create('emp_aura', {
      config: { 
        name: "Antitech Field",
        duration: durationMs 
      },
      state: {
        radius: 10
      }
    });

    caster.addEffect(effect);
  },

  emotes: {
    techFail: (creature) => {
      creature.say("<red>Your cybernetics seize with a shower of sparks! The HUD in your vision dissolves into static, and your artificial limbs grow cold and heavy.</red>");
    },
    approach: (creature, caster) => {
      creature.say(`<white>As you approach ${caster.name}, your electronic gear begins to whine and smoke. The barrier of dead-tech is impenetrable for your machinery.</white>`);
    }
  }
};

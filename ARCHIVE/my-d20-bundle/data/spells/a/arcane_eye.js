/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * You create an invisible magical sensor that sends you visual information. 
 * The eye can travel in any direction as long as the spell lasts, 
 * bypassing small openings and scouting ahead of the caster.
 */
const D20Utils = require('../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'arcane_eye',
  name: 'Arcane Eye',
  level: 4,
  school: 'divination',
  subschool: 'scrying',
  descriptors: [],
  source: 'PHB | p. 200',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 4
   * - Knowledge Domain: 4
   * - Oracle: 4
   * - Rarity: Common
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'bat_fur', 
      quantity: 1, 
      consumed: true, 
      notes: 'A bit of bat fur.' 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'unlimited', // Sensor can travel anywhere once cast
  target: 'self',
  area: null,
  duration: '1 min./level',
  savingThrow: 'none',
  spellResistance: false,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: true,
  dismissible: true,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const casterLevel = caster.getMeta('level') || 1;
    const durationMs = casterLevel * 60 * 1000;

    // CASTING EMOTES
    caster.say("<cyan>You rub the bat fur between your thumb and forefinger, chanting a rhythmic scrying mantra. A faint, spherical ripple in the air marks the birth of your invisible observer.</cyan>");
    caster.room.broadcastExcept(caster, `<cyan>${caster.name} pinches a tuft of fur and stares intently into the distance. A momentary shimmer of light appears before them and then vanishes into nothingness.</cyan>`);

    const effect = state.EffectFactory.create('arcane_eye_sensor', {
      config: { 
        name: "Arcane Eye",
        duration: durationMs 
      },
      state: {
        currentRoomId: caster.room.id,
        casterId: caster.id
      }
    });

    caster.addEffect(effect);
  },

  emotes: {
    scoutReport: (caster, room) => {
      caster.say(`<magenta>[Arcane Eye - ${room.title}]</magenta>\n${room.description}`);
    },
    sensorBlocked: (caster) => {
      caster.say("<red>The magical sensor bumps against a solid barrier it cannot bypass. You feel a spectral resistance in your mind.</red>");
    },
    interrupted: (caster) => {
      caster.say("<red>Your concentration snaps! The link to your arcane sensor shatters, leaving you momentarily disoriented.</red>");
    }
  }
};

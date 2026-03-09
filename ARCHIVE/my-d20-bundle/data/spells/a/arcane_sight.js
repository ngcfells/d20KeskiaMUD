/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * This powerful divination allows the caster to see magical auras instantly. 
 * Unlike Detect Magic, it requires no concentration to maintain and 
 * provides immediate information on the strength and school of all auras 
 * within a 120-foot line of sight.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'arcane_sight',
  name: 'Arcane Sight',
  level: 3,
  school: 'divination',
  subschool: null,
  descriptors: [],
  source: 'PHB | p. 201',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Bard: 3
   * - Magic Domain: 3
   * - Rarity: Common
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
  range: 'personal',
  target: 'self',
  area: '120-ft. line of sight',
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
    caster.say("<cyan>You chant the final words of the rite, and a sudden, sharp pressure builds behind your eyes. The world bleeds of its natural color, replaced by the vibrant, pulsing veins of the weave.</cyan>");
    caster.room.broadcastExcept(caster, `<cyan>${caster.name}'s eyes ignite with a steady, brilliant blue radiance that casts long shadows across the floor.</cyan>`);

    const effect = state.EffectFactory.create('arcane_sight_active', {
      config: { 
        name: "Arcane Sight",
        duration: durationMs 
      }
    });

    caster.addEffect(effect);
  },

  emotes: {
    auraDetected: (caster, target, school, strength) => {
      caster.say(`<magenta>[Arcane Sight]</magenta> <white>${target.name} pulses with a <yellow>${strength}</yellow> aura of <cyan>${school}</cyan> magic.</white>`);
    },
    noAura: (caster, target) => {
      caster.say(`<magenta>[Arcane Sight]</magenta> <grey>${target.name} is dark; no magical threads cling to it.</grey>`);
    }
  }
};

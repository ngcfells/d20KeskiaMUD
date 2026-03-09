/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * You trace mystic runes upon a book, map, scroll, or similar object.
 * The runes detonate when an unauthorized reader attempts to decipher them,
 * dealing force damage to the reader and those nearby.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'explosive_runes',
  name: 'Explosive Runes',
  level: 3,
  school: 'abjuration',
  subschool: null,
  descriptors: ['force'],
  source: 'PHB | p. 228',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Rune Domain: 3
   * - Rarity: Common
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [], // No cost in 3.5e

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one touched object weighing no more than 10 lbs.',
  area: null,
  duration: 'permanent until discharged',
  savingThrow: 'see text',
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
    // EMOTES: SUCCESSFUL CASTING
    caster.say(`<cyan>You trace complex, jagged runes onto the surface of ${target.name}. They flare with a violet light for a moment before sinking beneath the surface, invisible to the naked eye.</cyan>`);
    caster.room.broadcastExcept(caster, `<cyan>${caster.name} traces invisible patterns over ${target.name}. A brief, sharp hum of power vibrates through the air before fading.</cyan>`);

    const effect = state.EffectFactory.create('explosive_runes_effect', {
      config: { 
        name: "Explosive Runes",
        duration: -1 
      },
      state: {
        casterId: caster.id,
        casterName: caster.name,
        damage: '6d6',
        dc: 10 + 3 + Math.floor(((caster.getAttribute('intelligence') || 10) - 10) / 2)
      }
    });

    target.addEffect(effect);
  },

  emotes: {
    trigger: (reader, target) => {
      reader.say(`<red>As you begin to read the script on ${target.name}, the letters suddenly ignite with a blinding white intensity!</red>`);
      target.room.broadcastExcept(reader, `<red>As ${reader.name} examines ${target.name}, the object suddenly erupts in a deafening blast of pure force!</red>`);
    }
  }
};

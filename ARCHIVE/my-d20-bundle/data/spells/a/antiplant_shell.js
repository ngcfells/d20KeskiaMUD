/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Creates an invisible hemispherical field that prevents the entrance 
 * of all animate plants and plant-creatures.
 */
const D20Utils = require('../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'antiplant_shell',
  name: 'Antiplant Shell',
  level: 4,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'PHB | p. 200',

  /**
   * SPELL LISTS:
   * - Druid: 4
   * - Plant Domain: 4
   * - Ranger: 4
   * - Rarity: Common (among forest-dwelling cultures)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'DF'], // Divine Focus
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  area: '10-ft. radius emanation centered on you',
  duration: '10 min./level',
  savingThrow: 'none',
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
    const casterLevel = caster.getMeta('level') || 1;
    const durationMs = (10 * casterLevel) * 60 * 1000;

    // Casting Emotes
    caster.say("<green>You speak the ancient whispers of the grove, and a cool, scentless pressure expands outward from your chest.</green>");
    caster.room.broadcastExcept(caster, `<green>${caster.name} traces a protective circle in the air with their holy symbol, and the nearby flora seems to recoil as if from a sudden frost.</green>`);

    const effect = state.EffectFactory.create('antiplant_shell_effect', {
      config: { 
        name: "Antiplant Shell",
        duration: durationMs 
      }
    });

    caster.addEffect(effect);
  },

  emotes: {
    plantRepelled: (creature, caster) => {
      creature.say(`<red>A wall of absolute, sterile silence slams into you. Your vines and fibers seize; you cannot force yourself closer to ${caster.name}.</red>`);
      caster.say(`<green>The shell hums with a vibrant green frequency as it denies entry to ${creature.name}.</green>`);
    },
    observer: (creature, observer) => {
      observer.say(`<white>The movement of ${creature.name} is abruptly arrested by an invisible, shimmering barrier surrounding ${observer.name}.</white>`);
    }
  }
};

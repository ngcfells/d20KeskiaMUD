/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * An arcane lock cast upon a door, chest, or portal magically seals it. 
 * You can freely pass your own lock without affecting it; otherwise, 
 * the DC to break or bypass the object is significantly increased.
 */
const D20Utils = require('../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'arcane_lock',
  name: 'Arcane Lock',
  level: 2,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'PHB | p. 200',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Protection Domain: 2
   * - Rarity: Common
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'gold_dust', 
      quantity: 1, 
      minValue: 25, 
      consumed: true, 
      notes: 'Gold dust worth at least 25 gp.' 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'object', // door, chest, or portal
  area: null,
  duration: 'permanent',
  savingThrow: 'none',
  spellResistance: false,

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
    // Logic: Increases Lockpicking (Open Lock) and Break DC by 10.
    
    // EMOTES: SUCCESSFUL CASTING
    caster.say(`<cyan>You sprinkle the fine gold dust over the seams of ${target.name}, tracing a glowing azure sigil. The gold sinks into the material, and you hear a heavy, magical thud as the object seals.</cyan>`);
    caster.room.broadcastExcept(caster, `<cyan>${caster.name} traces a shimmering blue rune upon ${target.name}. A brief flash of golden light illuminates the room before the object settles into an unnaturally tight seal.</cyan>`);

    const effect = state.EffectFactory.create('arcane_lock_seal', {
      config: { 
        name: "Arcane Lock",
        duration: -1 // Permanent
      },
      state: {
        ownerId: caster.id,
        dcBonus: 10
      }
    });

    target.addEffect(effect);
  },

  emotes: {
    denied: (creature, target) => {
      creature.say(`<red>You pull at ${target.name}, but it feels as though it has been fused into the very architecture of the world. A faint blue spark stings your fingers.</red>`);
    },
    ownerPass: (caster, target) => {
      caster.say(`<cyan>The azure sigil on ${target.name} flares briefly in recognition, allowing you to pass without resistance.</cyan>`);
    }
  }
};

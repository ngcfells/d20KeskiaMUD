/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * You summon the skeletal remains of the damned to form a jagged, 
 * protective carapace over your flesh. Not only does this bone-plate 
 * turn aside mundane blades, but its horrific appearance and 
 * chattering teeth strike terror into those who dare strike you.
 */
const DamageTypes = require('../../lib/combat/damage-types');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'armor_of_zagus',
  name: 'Armor of Zagus',
  level: 2,
  school: 'necromancy',
  subschool: null,
  descriptors: ['evil', 'fear'],
  source: 'Dread Codex | p. 16',

  /**
   * SPELL LISTS:
   * - Cleric: 2 (Evil)
   * - Sorcerer/Wizard: 2
   * - Death Domain: 2
   * - Rarity: Uncommon
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'full-round',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'human_bone_fragment', 
      quantity: 1, 
      consumed: true, 
      notes: 'A fragment of a human rib or finger bone.' 
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

    // CASTING EMOTES
    caster.say("<red>You crush the bone fragment in your fist, chanting a guttural, jagged prayer. Sharp, spectral ribs erupt from your skin, interlocking into a grisly suit of bone-plate.</red>");
    caster.room.broadcastExcept(caster, `<red>A sound like a thousand dry branches snapping fills the air as jagged, yellowed bone fuses to ${caster.name}'s flesh, forming a macabre carapace.</red>`);

    const effect = state.EffectFactory.create('bone_plate_aura', {
      config: { 
        name: "Armor of Zagus",
        duration: durationMs 
      },
      state: {
        dc: 10 + 2 + Math.floor(((caster.getAttribute('intelligence') || caster.getAttribute('wisdom') || 10) - 10) / 2)
      }
    });

    caster.addEffect(effect);
  },

  emotes: {
    drTrigger: (caster, attacker) => {
      caster.say(`<white>The jagged bone-plate catches ${attacker.name}'s strike, the impact sounding like a dull thud against a graveyard wall.</white>`);
      attacker.say(`<grey>Your weapon bites into ${caster.name}, but it is snagged and slowed by the dense, spectral bone protecting them.</grey>`);
    },
    fearTrigger: (attacker) => {
      attacker.say(`<red>As your weapon strikes the bone-plate, the skulls etched into the armor begin to chatter and shriek. A wave of cold, necrotic terror grips your heart!</red>`);
    }
  }
};

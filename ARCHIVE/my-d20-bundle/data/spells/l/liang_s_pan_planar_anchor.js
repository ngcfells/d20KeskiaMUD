/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Synthesizes Netherese Chronomancy and Elven High Magic.
 * This spell 'locks' a room or a Spelljammer cabin across all 
 * known planes, preventing unauthorized planar travel, scrying, 
 * or ethereal shifting into the warded area.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_pan_planar_anchor',
  name: "Liang's Pan-Planar Anchor",
  level: 8,
  school: 'abjuration',
  subschool: null,
  descriptors: ['force', 'planar'],
  source: 'Homebrew | Chris Fells 2026 (Liang Chou Signature)',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 8
   * - Knowledge Domain: 8
   * - Protection Domain: 8
   * - Rarity: Artifact (Unique to Liang Chou's sanctums)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: '10 minutes', // A ritual of alignment
  components: ['V', 'S', 'M', 'F'],
  
  materialComponents: [
    { 
      id: 'astral_diamond_dust', 
      quantity: 1, 
      minValue: 1000, 
      consumed: true, 
      notes: '1,000 gp of dust from an astral diamond.' 
    }
  ],
  focus: {
    id: 'planar_sextant',
    notes: 'A gold-and-mythril sextant used for Spelljamming navigation.'
  },

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one room or vessel cabin',
  area: 'up to 40-ft. cube',
  duration: '24 hours',
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
    // EMOTES: SUCCESSFUL CASTING
    caster.say("<magenta>You align your sextant with the distant pulses of the Phlogiston and the Great Wheel. As you scatter the diamond dust, the air hums with the combined resonance of Netheril and Myth Drannor.</magenta>");
    caster.room.broadcastExcept(caster, `<magenta>${caster.name} traces complex multi-dimensional runes in the air. The walls of the room momentarily shimmer with a silver-blue lattice, vibrating with the power of a dozen worlds before settling into an absolute, reinforced stillness.</magenta>`);

    const effect = state.EffectFactory.create('pan_planar_ward', {
      config: { 
        name: "Pan-Planar Anchor",
        duration: 86400000 // 24 hours
      },
      state: { casterId: caster.id }
    });

    caster.room.addEffect(effect);
  },

  emotes: {
    teleportBlocked: (victim) => {
      victim.say("<red>You attempt to slip through the planes, but you strike a wall of absolute, multi-layered force. The 'Pan-Planar Anchor' of Liang Chou holds you firmly in this reality.</red>");
    },
    scryBlocked: (scryer) => {
      scryer.say("<grey>Your scrying sensor is instantly crushed by a surge of planar static. A cold, Shou-accented laughter echoes in your mind before the link breaks.</grey>");
    }
  }
};

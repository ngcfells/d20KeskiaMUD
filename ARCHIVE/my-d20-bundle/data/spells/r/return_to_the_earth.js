/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Return to the Earth
 * Author: Andrew Hamilton
 * Source: & Magazine Issue 2, p.62
 * 
 * Logic:
 * - Requirement: Must be cast on a natural surface (soil, grass, cave floor).
 * - Effect: Corporeal undead take 1d4 + 1 per 3 CL damage every round.
 * - Visual: Vegetation and insects swarm the undead, accelerating rot.
 * - Save: Fortitude half (checked every round).
 */

const { Broadcast: B } = require('ranvier');
const { ACID } = require('../../lib/combat/damage-types'); // Using Acid to represent 'Rot'

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'return_to_the_earth',
  name: 'Return to the Earth',
  level: 3,
  school: 'necromancy', // d20 mapping for 'Necromantic'
  subschool: null,
  descriptors: ['nature', 'decay'],
  source: '& Magazine Issue 2, p.62',

  /**
   * SPELL LISTS:
   * - Druid: 3
   * - Plant Domain: 3
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '6 segments', // ~1 round
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'holly_oak_leaves', 
      quantity: 1, 
      consumed: true,
      notes: 'Freshly plucked holly or oak leaves.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'touch', // Area is centered on the point touched
  target: 'area',
  area: '10-ft diameter / level emanation',
  duration: '1 round / level',
  savingThrow: 'fortitude half (recurring)',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const room = caster.room;

    // 1. TERRAIN VALIDATION
    const isNatural = room.getMeta('terrain') !== 'pavement' && 
                      room.getMeta('terrain') !== 'tile' && 
                      !room.hasTag('artificial_structure');
    
    if (!isNatural) {
      return B.sayAt(caster, "<yellow>The unnatural stone floor rejects the cycle of decay. You must cast this upon the living earth.</yellow>");
    }

    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const radius = 5 * cl; // 1" diameter = 10ft in 2E; 5ft radius

    B.sayAt(caster, `<green>You press holly leaves into the soil and chant a primal dirge. The ground heaves as insects and roots rise to reclaim the stolen life of the undead.</green>`);
    B.sayAtExcept(room, `<green>${caster.name} touches the earth; immediately, the surrounding soil bubbles with swarming beetles and grasping vines.</green>`, [caster]);

    const rotField = state.EffectFactory.create('return_to_earth_aura', {
      duration: cl * 6000,
      state: { 
        casterLevel: cl,
        dc: state.SpellcastingManager.calculateSpellDC(caster, this.level)
      }
    });

    room.addEffect(rotField);
  }
};

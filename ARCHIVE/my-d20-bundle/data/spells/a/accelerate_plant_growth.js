/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Accelerate Plant Growth
 * Source: WotC | Chronomancer (2E) p.25 | 3.5 Conversion
 * 
 * Logic:
 * - Area: 100 sq. ft. per level.
 * - Effect: Speeds plant aging by 1 month per CL.
 * - Risk: If the plant exceeds its natural seasonal cycle, it withers/dies.
 * - Transition: Aging occurs at 1 month per turn (1 minute in MUD time).
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'accelerate_plant_growth',
  name: 'Accelerate Plant Growth',
  level: 2,
  school: 'transmutation',
  subschool: 'chronomancy',
  descriptors: ['plant', 'time'],
  source: 'Chronomancer (2E) p.25',

  /**
   * SPELL LISTS:
   * - Chronomancer: 2
   * - Druid: 2
   * - Ranger: 2
   * - Plant Domain: 2
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '1 turn', // 10 rounds/1 minute
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'plant_sample', 
      quantity: 1, 
      consumed: true,
      notes: 'Required only if targeting a specific species (e.g., wheat, roses).' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: '10 ft./level',
  target: 'area (100 sq. ft./level)',
  area: 'burst',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    B.sayAt(caster, `<green>You hum a low, resonant tone that vibrates through the soil, coaxing the roots to drink centuries of time in moments.</green>`);
    B.sayAtExcept(caster.room, `<green>${caster.name} chants for a full turn; the surrounding foliage begins to quiver and stretch toward the sun with unnatural speed.</green>`, [caster]);

    // Check if the caster is targeting a specific type or 'All'
    const plantSample = caster.inventory.findItem('plant_sample');
    const targetType = plantSample ? plantSample.getMeta('species') : 'all';

    // Room Feature Update:
    // If the room has 'crops', they mature.
    if (caster.room.hasTag('has_crops')) {
        const cropState = caster.room.getMeta('crop_maturity') || 0;
        const newMaturity = cropState + cl;
        
        // If cl is too high (exceeds season), the crops die
        if (newMaturity > 6) { // Assuming a 6-month cycle
            caster.room.setMeta('crop_maturity', 0);
            caster.room.addTag('withered_crops');
            B.sayAt(caster.room, "<red>The plants grow too tall, too fast; they turn yellow and brittle, collapsing into dust as they exceed their natural lifespan.</red>");
        } else {
            caster.room.setMeta('crop_maturity', newMaturity);
            B.sayAt(caster.room, `<bold><green>The ${targetType === 'all' ? 'vegetation' : targetType} matures rapidly, heavy with unseasonal fruit.</green></bold>`);
        }
    }
  }
};

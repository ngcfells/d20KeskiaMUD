/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Abjuration (Exclusion Zone)
 * Source: 3PP High Magic / Kobold Press Deep Magic (Adapted)
 * 
 * Logic:
 * - Requires a Cold Iron Scepter as an anchoring focus.
 * - Consumes a significant volume of lapidary diamond dust.
 * - Creates a 10-ft. radius field of absolute magical negation.
 */

const { FORCE } = require('../../../lib/combat/damage-types');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'abjuration_spell',
  name: 'Abjuration',
  level: 9,
  school: 'abjuration',
  subschool: null,
  descriptors: [FORCE],
  source: '3PP High Magic / Kobold Press Deep Magic (Adapted)',

  spellLists: {
    cleric: 9,
    wizard: 9,
    sorcerer: 9,
    druid: 9,
    paladin: null,
    ranger: null,
    bard: null,
    adept: null,
    shugenja: 9, // Void / Universal Element
    wu_jen: 9,
    
    // CUSTOM/EXTENDED CLASSES
    maho_tsukai: 9,      // Ultimate rejection of the Kami/Natural Order
    arcane_artificer: 9, // Total field saturation/Null-zone
    savant: 9,           // Theoretical apex of defensive magic
    witch: 9,            // Ultimate Warding Circle
    sha_ir: 9,

    cleric_domains: { 'Magic': 9, 'Protection': 9, 'Wards': 9, 'Inquisition': 9 },
    prestige_classes: { 
      'Archmage': 9, 
      'Initiate of the Sevenfold Veil': 9,
      'Hierophant': 9 
    },
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Very Rare', kara_tur: 'Rare', maztica: 'Very Rare', hordelands: 'Rare', zakhara: 'Very Rare', evermeet: 'Common' },
    oerth: { flaness: 'Rare', oerik: 'Very Rare', hepmonaland: 'Rare' },
    krynn: { ansalon: 'Rare', taladas: 'Very Rare', adlatum: 'Rare' },
    eberron: { khorvaire: 'Rare', xen_drik: 'Very Rare', sarlona: 'Very Rare', argonnessen: 'Uncommon' },
    athas: 'Very Rare', 
    sigil: 'Uncommon',  
    ravenloft: { barovia: 'Very Rare', darkon: 'Rare', lamordia: 'Very Rare', falkovnia: 'Very Rare', dementlieu: 'Rare', hazlan: 'Rare', har-akir: 'Very Rare' },
    mystara: 'Rare',
    kalamar: 'Rare',
    hyboria: 'Non-Existent',
    d20_modern: 'Non-Existent',
    d20_cyber: 'Non-Existent',
    d20_future: 'Rare', 
    d20_cthulhu: 'Very Rare', 
    pathfinder: 'Rare',
    starfinder: 'Rare',
    earthdawn: 'Very Rare',
    shadowrun: 'Rare', 
    traveller: 'Non-Existent',
    twenty_three_hundred_ad: 'Non-Existent',
    twilight_2000: 'Non-Existent',
    warhammer: 'Rare', 
    palladium: 'Rare',
    rifts: 'Uncommon',
    scarn: 'Rare',
    trollworld: 'Rare'
  },

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '10 rounds', 
  components: ['V', 'S', 'M', 'F'],
  
  /**
   * Material Requirements:
   * 250 pinches @ 4gp/pinch = 1000gp total.
   */
  materialComponents: [
    { 
      id: 'diamond_dust', 
      quantity: 250, 
      minValue: 4, 
      consumed: true, 
      notes: 'A large quantity of high-grade diamond dust.' 
    }
  ],

  /**
   * Focus Requirement:
   * Cold Iron Scepter (Not consumed).
   */
  focus: {
    id: 'cold_iron_scepter',
    name: 'Cold Iron Scepter',
    minValue: 500,
    consumed: false
  },

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: '10 ft.',
  target: '10-ft. radius centered on caster',
  area: 'cylinder',
  duration: '1 hour/level',
  savingThrow: 'none',
  spellResistance: false,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // 1. Verify Focus is present (Manual check if engine doesn't auto-verify)
    const hasFocus = caster.hasItem('cold_iron_scepter');
    if (!hasFocus) {
      caster.say("<red>You lack the cold iron scepter required to anchor such massive abjuration energies!</red>");
      return;
    }

    // 2. Narrative: Caster & Room
    caster.say("<bold><cyan>You raise the Cold Iron Scepter high, its dark metal drinking the light as you pour out a shimmering cloud of diamond dust around you.</cyan></bold>");
    caster.room.emitExcept(caster, `<bold><cyan>${caster.name} raises a dark iron scepter, chanting words of absolute negation as diamond dust swirls into a hardening shell of force.</cyan></bold>`);

    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    // 3. Create the Room-wide Negation Field
    state.AreaEffectManager?.create({
      id: 'abjuration_field',
      caster,
      room: caster.room,
      duration: cl * 3600000, // 1 hour per level
      
      onEffectStart: (state, room) => {
        room.emit("<white>The air hums with a sterile, static energy. Every trace of stray magic in the area is instantly snuffed out.</white>");
      },

      tick: (state, room) => {
        if (Math.random() > 0.8) {
          room.emit("<cyan>Faint ripples of blue force shimmer along the edges of the exclusion zone.</cyan>");
        }
      }
    });
  }
};

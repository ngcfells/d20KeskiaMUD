/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Suppresses the effects of a single curse on a creature.
 * Source: Pathfinder AP #82, p. 72 (Standard d20/3.5E Conversion)
 */
module.exports = {
  id: 'abeyance',
  name: 'Abeyance',
  level: 2,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'Paizo' | 'Pathfinder AP #82, p.72',

  spellLists: {
    cleric: 2,
    wizard: null,
    sorcerer: null,
    druid: null,
    paladin: 2,
    ranger: null,
    bard: null,
    adept: 2,
    shugenja: 2, // Order: Gentle Rain or Restoration
    wu_jen: null,
    
    // CUSTOM/EXTENDED CLASSES
    maho_tsukai: null,   // Typically used to fight corruption, not spread it
    inquisitor: 2,       // Standard list inclusion
    shaman: 2,           // Fits "Spirit" warding theme
    spirit_shaman: 2,
    witch: 2,            // Fits curse-manipulation theme
    savant: 2,
    
    cleric_domains: { 'renewal': 2, 'restoration': 2, 'inquisition': 2 },
    prestige_classes: { 'exorcist': 2, 'hospitaler': 2 },
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common', kara_tur: 'Uncommon', maztica: 'Uncommon', hordelands: 'Rare', zakhara: 'Common', evermeet: 'Common' },
    oerth: { flaness: 'Common', oerik: 'Uncommon', hepmonaland: 'Rare' },
    krynn: { ansalon: 'Common', taladas: 'Uncommon', adlatum: 'Uncommon' },
    eberron: { khorvaire: 'Common', xen_drik: 'Rare', sarlona: 'Uncommon', argonnessen: 'Uncommon' },
    athas: 'Very Rare', // Curses are common, the cure is not
    sigil: 'Common',
    ravenloft: { barovia: 'Uncommon', darkon: 'Common', lamordia: 'Rare', falkovnia: 'Common', dementlieu: 'Common', hazlan: 'Common', har-akir: 'Uncommon' },
    mystara: 'Common',
    kalamar: 'Common',
    hyboria: 'Rare',
    d20_modern: 'Uncommon',
    d20_cyber: 'Non-Existent',
    d20_future: 'Non-Existent',
    d20_cthulhu: 'Rare',
    pathfinder: 'Common',
    starfinder: 'Uncommon', // Tech-based "curse" suppression
    earthdawn: 'Rare',
    shadowrun: 'Uncommon',
    traveller: 'Non-Existent',
    twenty_three_hundred_ad: 'Non-Existent',
    twilight_2000: 'Non-Existent',
    warhammer: 'Uncommon',
    palladium: 'Common',
    rifts: 'Common',
    scarn: 'Uncommon',
    trollworld: 'Common'
  },

  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [], // Uses Focus instead

  range: 'touch',
  target: 'creature touched',
  duration: '24 hours',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say(`<cyan>You press your holy symbol against ${target.name}, speaking words of sanctuary.</cyan>`);
    
    // Logic: Look for effects with type "curse" and suppress them
    const curses = Array.from(target.effects.effects).filter(e => e.config.type === 'curse');
    
    if (curses.length === 0) {
      caster.say("<yellow>There is no darkness here for you to hold back.</yellow>");
      return;
    }

    const curseToSuppress = curses[0]; 
    const abeyanceEffect = state.EffectFactory.create('abeyance_suppression', {
      duration: 24 * 60 * 60 * 1000,
      state: { suppressedEffectId: curseToSuppress.id }
    });

    target.addEffect(abeyanceEffect);
    target.say("<white>A heavy weight lifts from your soul. The curse still lingers, but its grip has loosened.</white>");
  }
};

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Evaporates moisture from the bodies of living creatures.
 * Source: WotC | PHB p.242 / Spell Compendium
 */
module.exports = {
  id: 'abi_dalzim_s_horrid_wilting',
  name: "Abi-Dalzim's Horrid Wilting",
  level: 8,
  school: 'necromancy',
  subschool: null,
  descriptors: ['death'],
  source: 'PHB p.242',

  spellLists: {
    cleric: null,
    wizard: 8,
    sorcerer: 8,
    druid: null, // Traditionally not a Druid spell, but available via Blighter
    paladin: null,
    ranger: null,
    bard: null,
    adept: null,
    shugenja: 8, // Water element focus (dehydration)
    wu_jen: 8,   // Water element focus
    
    // CUSTOM/EXTENDED CLASSES
    maho: 8,      // Essential high-level corruption magic
    witch: 8,            // Common in "Rot" or "Vengeance" patrons
    shaman: 8,           // Fits "bones" and "reaper" spirit themes
    spirit_shaman: 8,
    savant: 8,
    arcane_artificer: 8,

    cleric_domains: { 'water': 8, 'death': 8, 'suffering': 8, 'thirst': 8 },
    prestige_classes: { 
      'blighter': 8, 
      'nar_demonbinder': 8,
      'pale_master': 8 
    },
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common', kara_tur: 'Uncommon', maztica: 'Rare', hordelands: 'Rare', zakhara: 'Uncommon', evermeet: 'Rare' },
    oerth: { flaness: 'Common', oerik: 'Uncommon', hepmonaland: 'Uncommon' },
    krynn: { ansalon: 'Uncommon', taladas: 'Rare', adlatum: 'Rare' },
    eberron: { khorvaire: 'Common', xen_drik: 'Uncommon', sarlona: 'Rare', argonnessen: 'Uncommon' },
    athas: 'Common', // Thirst/Dehydration magic is prevalent here
    sigil: 'Common',
    ravenloft: { barovia: 'Uncommon', darkon: 'Common', lamordia: 'Rare', falkovnia: 'Common', dementlieu: 'Common', hazlan: 'Common', har-akir: 'Common' },
    mystara: 'Common',
    kalamar: 'Common',
    hyboria: 'Very Rare',
    d20_modern: 'Rare',
    d20_cyber: 'Non-Existent',
    d20_future: 'Non-Existent',
    d20_cthulhu: 'Uncommon',
    pathfinder: 'Common',
    starfinder: 'Rare',
    earthdawn: 'Rare',
    shadowrun: 'Uncommon',
    traveller: 'Non-Existent',
    twenty_three_hundred_ad: 'Non-Existent',
    twilight_2000: 'Non-Existent',
    warhammer: 'Common', // Nurgle-aligned desiccation
    palladium: 'Uncommon',
    rifts: 'Common',
    scarn: 'Uncommon',
    trollworld: 'Common'
  },

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { id: 'pinch_of_dust', quantity: 1, consumed: true, notes: 'A pinch of dust.' }
  ],

  range: 'long',
  target: 'living creatures within 30-ft. cube',
  duration: 'instantaneous',
  savingThrow: 'fortitude half',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const damageRoll = state.Dice.roll(`${Math.min(cl, 20)}d6`);

    caster.say("<magenta>You extend a withered hand, and the very air screams as you pull the moisture from your enemies.</magenta>");
    caster.room.emitExcept(caster, `<magenta>${caster.name} gestures, and a shimmering heat-haze ripples through the air, causing flesh to shrivel and crack.</magenta>`);

    for (const unit of caster.room.characters) {
      if (unit === caster) continue;
      if (!this._isLiving(unit)) continue;

      let finalDamage = ctx.savePassed ? Math.floor(damageRoll / 2) : damageRoll;

      state.Damage.apply({ 
        amount: finalDamage, 
        type: 'energy', 
        attacker: caster, 
        target: unit, 
        source: this.name 
      });

      unit.say("<red>Your skin parches and your throat tightens as the life-giving water is ripped from your cells!</red>");
    }
  },

  _isLiving(unit) {
    const type = unit.getMeta('type');
    return !['undead', 'construct', 'elemental'].includes(type);
  }
};

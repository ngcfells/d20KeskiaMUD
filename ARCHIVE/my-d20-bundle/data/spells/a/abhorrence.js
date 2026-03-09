/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * You temporarily make a creature less appealing to others, 
 * causing their next social interaction to falter significantly.
 * Source: Deep Magic (Kobold Press)
 */
const { MIND } = require('../../../lib/combat/damage-types');

module.exports = {
  id: 'abhorrence',
  name: 'Abhorrence',
  level: 0,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: [MIND, 'mind-affecting'],
  source: 'Kobold Press | Deep Magic, Pathfinder 1E',

  spellLists: {
    cleric: 0,
    wizard: 0,
    sorcerer: 0,
    druid: null,
    paladin: null,
    ranger: null,
    bard: 0,
    adept: 0,
    shugenja: null,
    wu_jen: null,

    // CUSTOM/EXTENDED CLASSES
    maho_tsukai: 0,      // Fits the theme of blood/spiritual taint
    witch: 0,            // Standard "minor hex" flavor
    antipaladin: 0,      // Crucial for low-level social intimidation
    savant: 0,
    arcane_artificer: 0, // "Uncanny" appearance modification

    cleric_domains: { 'envy': 0, 'corruption': 0, 'tyranny': 0 },
    prestige_classes: { 'assassin': 0, 'mindbender': 0 },
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common', kara_tur: 'Uncommon', maztica: 'Rare', hordelands: 'Rare', zakhara: 'Uncommon', evermeet: 'Rare' },
    oerth: { flaness: 'Common', oerik: 'Uncommon', hepmonaland: 'Uncommon' },
    krynn: { ansalon: 'Uncommon', taladas: 'Rare', adlatum: 'Rare' },
    eberron: { khorvaire: 'Common', xen_drik: 'Uncommon', sarlona: 'Rare', argonnessen: 'Uncommon' },
    athas: 'Uncommon', 
    sigil: 'Common',
    ravenloft: { barovia: 'Common', darkon: 'Common', lamordia: 'Common', falkovnia: 'Common', dementlieu: 'Common', shadowlands: 'Common', har-akir: 'Uncommon' },
    mystara: 'Common',
    kalamar: 'Common',
    hyboria: 'Rare',
    d20_modern: 'Uncommon',
    d20_cyber: 'Rare', 
    d20_future: 'Rare',
    d20_cthulhu: 'Common', 
    pathfinder: 'Common',
    starfinder: 'Uncommon',
    earthdawn: 'Rare',
    shadowrun: 'Uncommon',
    traveller: 'Non-Existent',
    twenty_three_hundred_ad: 'Non-Existent',
    twilight_2000: 'Non-Existent',
    warhammer: 'Common', 
    palladium: 'Uncommon',
    rifts: 'Common',
    scarn: 'Uncommon',
    trollworld: 'Common'
  },

  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  range: 'close',
  target: 'one creature',
  duration: '1 minute or until discharged',
  savingThrow: 'will negates',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const { savePassed } = ctx;

    caster.say(`<magenta>You weave a subtle, oily glamour around ${target.name}, tainting their perceived character.</magenta>`);
    caster.room.emitExcept([caster, target], `<magenta>${caster.name} traces a jagged sign in the air toward ${target.name}, leaving a faint, sickly scent behind.</magenta>`);

    if (savePassed) {
      target.say("<white>You feel a greasy film pass over your skin, but your inner light washes it away.</white>");
      caster.say(`<yellow>${target.name} resists the social taint.</yellow>`);
      return;
    }

    target.say("<red>A sudden wave of self-loathing hits you. You feel as though your very presence has become an affront to those around you.</red>");

    // Apply the "Abhorred" Effect
    const abhorredEffect = state.EffectFactory.create('abhorred', {
      duration: 60000, // 1 minute
    });
    
    target.addEffect(abhorredEffect);
  }
};
